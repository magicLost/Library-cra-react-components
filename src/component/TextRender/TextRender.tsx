import React from 'react';
import classes from './TextRender.module.scss';
import Parser from './Model/Parser';

interface TextRenderProps  {
    textToParse: any[];
}

const textRender = ({textToParse}: TextRenderProps) => {

    const parser = new Parser();

    const content = parser.parse(textToParse, classes);

    console.log("render textRender");

    return (
        
        <div className={classes.TextRender}>{content}</div>
            
    );
};

export default textRender;
        