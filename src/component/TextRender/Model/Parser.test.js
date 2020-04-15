import {mainText} from "./../../../data/homepage_data";
import Parser from "./Parser";
import React from 'react';

const classes = { Anchor: "Anchor", Header: "Header", Span: "Span"};
let parser = null;

describe("Parser", () => {

    beforeEach(() => {
        parser = new Parser();
    })

    test("parse - must return [ <h3>, <p>, <ul>, <h3>, <p> ]", () => {

        const result = parser.parse(mainText, classes);

        //expect(result[0].props.children).toHaveLength(2);
        expect(result[0].type).toEqual('h3');

        expect(result[1].props.children).toHaveLength(1);
        expect(result[1].type).toEqual('p');

        expect(result[2].props.children).toHaveLength(6);
        expect(result[2].type).toEqual('ul');

        expect(result[3].type).toEqual('h3');

        expect(result[4].props.children).toHaveLength(5);
        expect(result[4].type).toEqual('p');

        //console.log(result);

    });

    describe("Private methods", () => {

        test("getText - Must return text in <> tag, if isLi = true must be wrapped in <li>", () => {

            let result = parser.getText(mainText[1].children[0].options, false);

            expect(result.props.children).toEqual(mainText[1].children[0].options.text);


            result = parser.getText(mainText[1].children[0].options, true);

            expect(result.key).toBeDefined();

            expect(result.type).toEqual('li');

            expect(result.props.children).toEqual(<React.Fragment>{mainText[1].children[0].options.text}</React.Fragment>);
        });

        test("getHeader - Must return text in <h> tag with class", () => {

            const result = parser.getHeader(mainText[0].options, classes.Header);

            //console.log(result);

            expect(result.type).toEqual('h3');

            expect(result.props.className).toEqual(classes.Header);
            expect(result.props.children).toEqual(mainText[0].options.text);

        });

        test("getAnchor - must return <a> tag with label", () => {

            let result = parser.getAnchor(mainText[2].children[2].options, classes.Anchor, false);

            //console.log(result);

            expect(result.type).toEqual('a');

            expect(result.props.className).toEqual(classes.Anchor);
            expect(result.props.href).toEqual(mainText[2].children[2].options.href);
            expect(result.props.children).toEqual(mainText[2].children[2].options.label);

            /* isLi = true */
            result = parser.getAnchor(mainText[2].children[2].options, classes.Anchor, true);

            //console.log(result);

            expect(result.type).toEqual('li');

            expect(result.props.children.type).toEqual('a');

            expect(result.props.children.props.className).toEqual(classes.Anchor);
            expect(result.props.children.props.href).toEqual(mainText[2].children[2].options.href);
            expect(result.props.children.props.children).toEqual(mainText[2].children[2].options.label);


        }); 

       /*  test("getSpan - must return text in <span> tag", () => {

            const result = parser.getHeader(mainText[0].children[0].options, classes.Header);

            console.log(result);

            expect(result.type).toEqual('h3');

            expect(result.props.className).toEqual(classes.Header);
            expect(result.props.children).toEqual(mainText[0].children[0].options.text);
        });  */
    })



});