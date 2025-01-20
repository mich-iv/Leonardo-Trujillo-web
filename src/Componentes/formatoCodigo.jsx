import React, { Component } from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css'

class HighLight extends Component {
    componentDidMount() {
        this.updateCodeSyntaxHighlighting();
    }

    componentDidUpdate() {
        this.updateCodeSyntaxHighlighting();
    }


    updateCodeSyntaxHighlighting = () => {
        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightElement(block);
          });
    };

    render() {
        return (
            <div
                style={{ overflowX: "auto" }}
                className="content"
                dangerouslySetInnerHTML={{ __html: this.props.body }}
            />
        );
    }
}

export default HighLight;