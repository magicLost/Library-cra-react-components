import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '../../../Carousels/Carousel/CarouselOpacity/node_modules/@testing-library/jest-dom/extend-expect';

import FeedbackModel from './FeedbackModel';
import FormValidatorChain from '../../../../helper/Validation/FormValidatorChain';

let feedbackModel = null;
let validatorChain = null;
let target = { name: "name", type: "text", value: "Hello"};
let validators = [ 1, 23, 32 ];
let formElementsDesc = "formElementsDesc"

let feedbackFormElementsState = null;

let callMeFormElementsState = null;

describe("FeedbackModel", () => {

    describe("inputValidation", () => {

        beforeEach(() => {

            validatorChain = new FormValidatorChain();
            
            feedbackModel = new FeedbackModel(validatorChain, false);
            feedbackModel.getValidatorsDesc = jest.fn();
            feedbackModel.getValidatorsDesc.mockReturnValue([ 1, 23, 32 ]);

        });

        afterEach(() => {

            feedbackModel.getValidatorsDesc.mockClear();

        });

        test("If validation good it must return IFormElementState with empty errors", () => {

            validatorChain.isValid = jest.fn();
            validatorChain.isValid.mockReturnValue(true);
            
            const formElementState = feedbackModel.inputValidation(target, formElementsDesc);

            expect(feedbackModel.getValidatorsDesc).toHaveBeenNthCalledWith(1, target.name, formElementsDesc);

            expect(validatorChain.isValid).toHaveBeenNthCalledWith(1, target.value, validators);

            expect(formElementState).toEqual({ name: target.name, value: target.value, errors: []});
    
        });

        test("If validation fails it must return IFormElementState with errors", () => {

            validatorChain.isValid = jest.fn();
            validatorChain.isValid.mockReturnValue(false);

            validatorChain.getErrorMessages = jest.fn();
            validatorChain.getErrorMessages.mockReturnValue(['error23', 'err23']);
            
            const formElementState = feedbackModel.inputValidation(target, formElementsDesc);

            expect(feedbackModel.getValidatorsDesc).toHaveBeenNthCalledWith(1, target.name, formElementsDesc);

            expect(validatorChain.isValid).toHaveBeenNthCalledWith(1, target.value, validators);

            expect(formElementState).toEqual({ name: target.name, value: target.value, errors: ['error23', 'err23']});

        });

        test("If value empty, it must return no error", () => {

            target.value = '';

            const formElementState = feedbackModel.inputValidation(target, formElementsDesc);

            expect(formElementState).toEqual({ name: target.name, value: target.value, errors: []});

        })



    });

    describe("validateOnSubmit", () => {

        beforeEach(() => {

            feedbackFormElementsState = [
                {
                    name: 'name',
                    value: 'name123',
                    errors: ['Bad name']
                },
                {
                    name: 'email',
                    value: 'email123',
                    errors: ["Bad email"]
                },
                {
                    name: 'phone',
                    value: 'phone123',
                    errors: ["Bad phone"]
                } ,
                {
                    name: 'comment',
                    value: 'comment123',
                    errors: ["Bad comment"]
                } 
            ];

            callMeFormElementsState = [
                {
                    name: 'name',
                    value: 'name123',
                    errors: ['Bad name']
                },
                {
                    name: 'phone',
                    value: 'phone123',
                    errors: ["Bad phone"]
                }
            ];

            validatorChain = new FormValidatorChain();
            
            feedbackModel = new FeedbackModel(validatorChain, false);
        });

        test("If we pass all values it must return ''", () => {

            let result = feedbackModel.validateOnSubmit(feedbackFormElementsState);

            expect(result).toEqual("");

            feedbackModel = new FeedbackModel(validatorChain, true);

            result = feedbackModel.validateOnSubmit(callMeFormElementsState);

            expect(result).toEqual("");

        });

        test("If we do not pass name value it must return 'Представьтесь, пожалуйста.'", () => {

            feedbackFormElementsState[0].value = '';
            callMeFormElementsState[0].value = '';

            let result = feedbackModel.validateOnSubmit(feedbackFormElementsState);

            expect(result).toEqual("Представьтесь, пожалуйста.");

            result = feedbackModel.validateOnSubmit(callMeFormElementsState);

            expect(result).toEqual("Представьтесь, пожалуйста.");


        });

        test("If isCallMe=false and we do not pass phone and email value it must return 'Укажите ваш телефон или электронный адрес иначе мы не сможем с вами связаться.'", () => {

            feedbackFormElementsState[1].value = '';
            feedbackFormElementsState[2].value = '';

            let result = feedbackModel.validateOnSubmit(feedbackFormElementsState);

            expect(feedbackModel.isCallMe).toEqual(false);

            expect(result).toEqual("Укажите ваш телефон или электронный адрес иначе мы не сможем с вами связаться.");

        });

        test("If isCallMe=true and we do not pass phone value it must return 'Укажите ваш номер телефона иначе мы не сможем с вами связаться.'", () => {

            feedbackModel = new FeedbackModel(validatorChain, true);

            callMeFormElementsState[1].value = '';

            let result = feedbackModel.validateOnSubmit(callMeFormElementsState);

            expect(feedbackModel.isCallMe).toEqual(true);

            expect(result).toEqual("Укажите ваш номер телефона иначе мы не сможем с вами связаться.");


        });

    });

});