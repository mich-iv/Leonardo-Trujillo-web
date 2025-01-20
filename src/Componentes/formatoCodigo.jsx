import React, { Component } from 'react';
import 'highlight.js/styles/github.css'

class Highlight extends Component {
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

export default Highlight;