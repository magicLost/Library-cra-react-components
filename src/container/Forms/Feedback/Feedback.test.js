
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '../../Carousels/Carousel/CarouselOpacity/node_modules/@testing-library/jest-dom/extend-expect';

import axiosMock from 'axios';
jest.mock('axios');

import Feedback from "./Feedback";
import inputClasses from './../../../component/FormElements/Input/Input.module.scss';
import formClasses from './../../../component/Form/Form.module.scss';
import callMeFormClasses from "./../CallMe/CallMeForm/CallMeForm.module.scss";
import feedbackFormClasses from './../Feedback/FeedbackForm/FeedbackForm.module.scss';

let _render = null;
const successOkButtonClickHandler = jest.fn();
const url = "http://super.ru";

let nameInput = null;
let phoneInput = null;
let emailInput = null;
let commentTextarea = null;
let clearButton = null;
let submitButton = null;

const setElements = () => {

    nameInput = _render.getByLabelText('Ваше имя');
    phoneInput = _render.getByLabelText('Ваш номер телефона');
    emailInput = _render.getByLabelText('Ваш электронный адрес');
    commentTextarea = _render.getByLabelText('Ваш комментарий');
    clearButton = _render.getByText('Очистить').parentElement;
    submitButton = _render.getByText('Отправить').parentElement;

};

const setValuesToElements = () => {

    fireEvent.change(nameInput, { target: { value: "Nikki" } });
    fireEvent.change(phoneInput, { target: { value: "123456776" } });
    fireEvent.change(emailInput, { target: { value: "example@mail.ru" } });
    fireEvent.change(commentTextarea, { target: { value: "Comment..." } });
}

//url, successOkButtonClickHandler, hiddenFields
describe("Feedback", () => {
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<Feedback 
                    url={url}
                    successOkButtonClickHandler={successOkButtonClickHandler}
                    hiddenFields={[{name: "photoId", value: "123id"}]}
                    isCallMe={false}
                />);
        
        });

        afterEach(cleanup)

        test("If isCallMe = true it must render .CallMeForm", () => {

            _render.rerender(<Feedback 
                url={url}
                successOkButtonClickHandler={successOkButtonClickHandler}
                hiddenFields={[{name: "photoId", value: "123id"}]}
                isCallMe={true}
            />);

            const callMeForm = document.querySelector('.' + callMeFormClasses.CallMeForm);

            expect(callMeForm).not.toEqual(null);

        });

        test("If isCallMe = false it must render .FeedbackForm", () => {

            const feedbackForm = document.querySelector('.' + feedbackFormClasses.FeedbackForm);

            expect(feedbackForm).not.toEqual(null);

        });


    
        describe("Change events", () => {
    
            test("We past data to name input and it must echo this data and echo error", () => {
            
                nameInput = _render.getByLabelText('Ваше имя');
               /*  const phoneInput = _render.getByLabelText('Ваш номер телефона');
                const emailInput = _render.getByLabelText('Ваш электронный адрес');
                const commentTextarea = _render.getByLabelText('Ваш комментарий');
                const clearButton = _render.getByText('Очистить').parentElement;
                const submitButton = _render.getByText('...Подождите').parentElement; */

                expect(nameInput.value).toEqual('');

                fireEvent.change(nameInput, { target: { value: "new name" } });

                expect(nameInput.value).toEqual('new name');

                ////
                fireEvent.change(nameInput, { target: { value: "!new name" } });

                let error = _render.getAllByText("Недопустимый символ.");
                
                expect(nameInput.value).toEqual('!new name');
                expect(error).toHaveLength(1);

                /////
                fireEvent.change(nameInput, { target: { value: "" } });

                error = document.querySelector("." + inputClasses.Error);
                
                expect(nameInput.value).toEqual('');
                expect(error).toEqual(null);
            });
    
        });

        test("Clear event - we click on clear button and all elements has empty value", () => {

            setElements();
            setValuesToElements();

            /* const nameInput = _render.getByLabelText('Ваше имя');
            const phoneInput = _render.getByLabelText('Ваш номер телефона');
            const emailInput = _render.getByLabelText('Ваш электронный адрес');
            const commentTextarea = _render.getByLabelText('Ваш комментарий');
            const clearButton = _render.getByText('Очистить').parentElement;


            fireEvent.change(nameInput, { target: { value: "new name" } });
            fireEvent.change(phoneInput, { target: { value: "123" } });
            fireEvent.change(emailInput, { target: { value: "example@mail.ru" } });
            fireEvent.change(commentTextarea, { target: { value: "new name" } }); */

            fireEvent.click(clearButton);

            expect(nameInput.value).toEqual('');
            expect(phoneInput.value).toEqual('');
            expect(emailInput.value).toEqual('');
            expect(commentTextarea.value).toEqual('');


        });

        describe("onSubmit", () => {

            test("If we don't pass name value it shows 'Представьтесь, пожалуйста.'", () => {

                submitButton = _render.getByText('Отправить').parentElement;

                let error = document.querySelector("." + formClasses.FormError);

                expect(error).toEqual(null);

                fireEvent.click(submitButton);

                error = document.querySelector("." + formClasses.FormError);

                let checkErrorText = _render.getByText("Представьтесь, пожалуйста.");

                expect(error).not.toEqual(null);

            });

            test("If we don't pass email or phone value it shows 'Укажите ваш телефон или электронный адрес иначе мы не сможем с вами связаться.'", () => {

                nameInput = _render.getByLabelText('Ваше имя');

                fireEvent.change(nameInput, { target: { value: "new name" } });

                submitButton = _render.getByText('Отправить').parentElement;

                let error = document.querySelector("." + formClasses.FormError);

                expect(error).toEqual(null);

                fireEvent.click(submitButton);

                error = document.querySelector("." + formClasses.FormError);

                let checkErrorText = _render.getByText('Укажите ваш телефон или электронный адрес иначе мы не сможем с вами связаться.');

                expect(error).not.toEqual(null);

            });

            test("If isCallMe=true and we don't pass phone value it shows 'Укажите ваш номер телефона иначе мы не сможем с вами связаться.'", () => {

                cleanup();

                _render = render(<Feedback 
                    url={url}
                    successOkButtonClickHandler={successOkButtonClickHandler}
                    hiddenFields={[{name: "photoId", value: "123id"}]}
                    isCallMe={true}
                />);

                nameInput = _render.getByLabelText('Ваше имя');

                fireEvent.change(nameInput, { target: { value: "new name" } });

                submitButton = _render.getByText('Отправить').parentElement;

                let error = document.querySelector("." + formClasses.FormError);

                expect(error).toEqual(null);

                fireEvent.click(submitButton);

                error = document.querySelector("." + formClasses.FormError);

                let checkErrorText = _render.getByText('Укажите ваш номер телефона иначе мы не сможем с вами связаться.');

                expect(error).not.toEqual(null);

            });
 
            //We send request - three possible answers: serverError, formError, success
            test("If server return SUCCESS we must see 'Мы получили вашу заявку и свяжемся с вами в течение 15 минут.' and must be a OK button instead of Submit", async () => {

                /* const requestConfig = {
                    method: "post",
                    url: url,
                    data: formData ,
                    headers: {'Content-Type': 'multipart/form-data'},
                } */

                setElements();
                setValuesToElements();

                //expect(nameInput.value).toEqual('');

                /* fireEvent.change(nameInput, { target: { value: "Nikki" } });
                fireEvent.change(phoneInput, { target: { value: "123456776" } });
                fireEvent.change(emailInput, { target: { value: "example@mail.ru" } });
                fireEvent.change(commentTextarea, { target: { value: "" } }); */

                axiosMock.mockResolvedValueOnce({
                    data: { result: 'SUCCESS' },
                });

                fireEvent.click(submitButton);

                const greetingTextNode = await waitForElement(() =>
                    _render.getByText('Мы получили вашу заявку и свяжемся с вами в течение 15 минут.')
                );

                const okButton = await waitForElement(() =>
                    _render.getByText('Ок')
                );
            })

            test("If server return  error we must see formError", async () => {

                /* const requestConfig = {
                    method: "post",
                    url: url,
                    data: formData ,
                    headers: {'Content-Type': 'multipart/form-data'},
                } */

                setElements();
                setValuesToElements();

                axiosMock.mockResolvedValueOnce({
                    data: { result: 'ERROR', error: 'Bad fat ERRor' },
                });

                fireEvent.click(submitButton);

                const greetingTextNode = await waitForElement(() =>
                    _render.getByText('Bad fat ERRor')
                );
            });

            test("If server do not answer we must see formError 'Сервер не хочет отвечать.'", async () => {

                setElements();
                setValuesToElements();

                axiosMock.mockResolvedValueOnce(new Error("Bad fat ERRor"));

                fireEvent.click(submitButton);

                const greetingTextNode = await waitForElement(() =>
                    _render.getByText('Сервер не хочет отвечать.')
                );
            });

        });
    
    });

});

        