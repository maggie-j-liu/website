import AnchorLink from './AnchorLink';
import code from './CodeBlock';
import CodeBlock from './GithubCodeBlock';

const MDXComponents = {
    ...code,
    ...AnchorLink,
    CodeBlock
};

export default MDXComponents;