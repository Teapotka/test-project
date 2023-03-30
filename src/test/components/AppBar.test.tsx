import {fireEvent, render, screen} from "@testing-library/react";
import AppBar from "../../components/AppBar";
import {Provider} from "react-redux";
import {store} from "../../redux/store";
import {BrowserRouter} from "react-router-dom";

jest.mock('axios', () => {
    return {
        create: jest.fn(() => ({
            get: jest.fn(),
            interceptors: {
                request: {use: jest.fn(), eject: jest.fn()},
                response: {use: jest.fn(), eject: jest.fn()}
            }
        }))
    }
})

describe('App Bar', () => {
    test('should change input style', async () => {
        const location:any = new URL('http://localhost'+process.env.REACT_APP_BASE_ROUTE)
        location.assign = jest.fn()
        location.replace = jest.fn()
        location.reload = jest.fn()

        // @ts-ignore
        delete window.location
        window.location = location
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <AppBar/>
                </Provider>
            </BrowserRouter>
        )
        const appbar = await screen.findByTestId('app-bar')
        const input = appbar.children[0].children[0].children[1].children[0] as HTMLInputElement
        const button = appbar.children[0].children[0].children[1].children[1] as HTMLButtonElement
        expect(input.placeholder).toBe('Search...')
        fireEvent.click(button)
        await new Promise((r) => setTimeout(r, 2000));
        expect(input.placeholder).toBe('Write a name')
    })
})