// components/codeblock.js
import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {cb as syntaxStyle} from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock =  {
  code({node, inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || '');
    const lang = match ? match[1] : 'bash';
    return !inline ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, '')}
        style={syntaxStyle}
        language={lang}
        PreTag="div"
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
}

export default CodeBlock