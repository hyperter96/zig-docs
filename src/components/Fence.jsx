import styled from 'styled-components';
import {Highlight, themes } from 'prism-react-renderer';

const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.5;
`


export function Fence({ children, language, lineNum }) {
  if (lineNum) {
    return (
      <Highlight
        code={children.trimEnd()}
        language={language}
        theme={themes.palenight}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
              <LineNo>{i + 1}</LineNo>
              {line.map((token, key) => <span key={key} {...getTokenProps({ token })} />)}
              </div>
            )            
            )}
          </pre>
        )}
      </Highlight>
    )
  }
  return (
    <Highlight
      code={children.trimEnd()}
      language={language}
      theme={themes.palenight}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
            {line.map((token, key) => <span key={key} {...getTokenProps({ token })} />)}
            </div>
          )            
          )}
        </pre>
      )}
    </Highlight>
  )
}
