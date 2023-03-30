import {fireEvent, render, screen} from "@testing-library/react";
import Card from "../../components/Card";
import {BrowserRouter} from "react-router-dom";

describe('Card', () => {
    test('should navigate', async () => {
        const mock: TCardParams = {
            id: 'id',
            url: `${process.env.REACT_APP_NO_IMAGE}`,
            title: 'Title',
            categories: ['Other'],
            authors: ['Anonymous']
        }
        render(
            <BrowserRouter>
                <Card
                    {...mock}
                />
            </BrowserRouter>
        )
        const card = await screen.findByTestId('card')
        fireEvent.click(card)
        expect(global.window.location.pathname).toBe(`${process.env.REACT_APP_BASE_ROUTE}${mock.id}`)
    })
});