import styled from 'styled-components'
import Highlight, { defaultProps, Prism } from 'prism-react-renderer'
require("prismjs/components/prism-zig");

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
        Prism={Prism}
        {...defaultProps}
        code={children.trimEnd()}
        language={language}
        theme={undefined}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
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
      Prism={Prism}
      {...defaultProps}
      code={children.trimEnd()}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
            </div>
          )            
          )}
        </pre>
      )}
    </Highlight>
  )
}
