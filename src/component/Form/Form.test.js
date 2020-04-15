
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
  } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import Form from "./Form";
import classes from './Form.module.scss';


describe("Form", () => {

    let _render = null;
    let onClear = null;
    let onSubmit = null;
    let onSuccess = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<Form 
                formError={""}  
                onClear={({}) => {}}
                onSubmit={({}) => {}}
                isLoading={false}
                isSuccess={false}
                onSuccess={({}) => {}}
            >
                <h1>Hello</h1>
                <h1>Buy</h1>
            </Form>);
        
        });

        afterEach(cleanup)
    
        test("It must render clear button, submit button", () => {
            
            const clear_buttons = _render.getAllByText('Очистить');
            const submit_buttons = _render.getAllByText('Отправить');

            expect(clear_buttons).toHaveLength(1);
            expect(submit_buttons).toHaveLength(1);
            
        });

        test("It must render chidlren", () => {
            
            const chidlren = document.querySelectorAll('h1');

            expect(chidlren).toHaveLength(2);
            
        });

        test("It do not render formError if it equal '' ", () => {
            
            const error = document.querySelector('.' + classes.FormError);

            expect(error).toEqual(null);
            
        });

        test("It must render formError if it not empty", () => {
            
            _render.rerender(<Form 
                    formError={"Bad, Fat error"}  
                    onClear={({}) => {}}
                    onSubmit={({}) => {}}
                >
                    <h1>Hello</h1>
                    <h1>Buy</h1>
                </Form>);

            const error = document.querySelector('.' + classes.FormError);

            expect(error).toHaveTextContent(/^Bad, Fat error$/);
            
        });

        test("If isSuccess=true it must instead of render submit button, render ok button", () => {

            _render.rerender(<Form 
                formError={""}  
                onClear={({}) => {}}
                onSubmit={({}) => {}}
                isLoading={false}
                isSuccess={true}
                onSuccess={({}) => {}}
            >
                <h1>Hello</h1>
                <h1>Buy</h1>
            </Form>);

            const ok_buttons = _render.getAllByText('Ок');
            const clear_buttons = _render.getAllByText('Очистить');
            //const submit_buttons = _render.getAllByText('Отправить');

            expect(clear_buttons).toHaveLength(1);
            //expect(submit_buttons).toHaveLength(1);
            expect(ok_buttons).toHaveLength(1);

        });
    
    });

    describe("Event Listeners", () => {

        beforeEach(() => {

            onClear = jest.fn();
            onSubmit = jest.fn();
            onSuccess = jest.fn();
        
            _render = render(<Form 
                formError={""}  
                onClear={onClear}
                onSubmit={onSubmit}
                isLoading={false}
                isSuccess={false}
                onSuccess={onSuccess}
            >
                <h1>Hello</h1>
                <h1>Buy</h1>
            </Form>);
        
        });

        afterEach(cleanup);

        test("If we click on submit button it must fire onSubmit prop", () => {
            
            fireEvent.click(_render.getByText('Отправить'));

            expect(onSubmit).toHaveBeenCalledTimes(1);
            
        });

        test("If we click on clear button it must fire onClear prop", () => {
            
            fireEvent.click(_render.getByText('Очистить'));

            expect(onClear).toHaveBeenCalledTimes(1);
            
        });

        test("If we click on ok button it must fire onSuccess prop", () => {

            _render.rerender(<Form 
                formError={""}  
                onClear={onClear}
                onSubmit={onSubmit}
                isLoading={false}
                isSuccess={true}
                onSuccess={onSuccess}
            >
                <h1>Hello</h1>
                <h1>Buy</h1>
            </Form>);
            
            fireEvent.click(_render.getByText('Ок'));

            expect(onSuccess).toHaveBeenCalledTimes(1);
            
        });

    });

});

        