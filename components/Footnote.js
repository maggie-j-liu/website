import React from "react"

const Footnote = ({ children }) => {
        const allChildren = React.Children.map(children, child => {
            if (child?.props?.mdxType !== 'p') return child;
            const paragraph = React.Children.map(child.props.children, pchild => {
                if (pchild?.props?.mdxType === 'sup' && React.Children.only(pchild.props.children)) {
                    const c = React.Children.toArray(pchild.props.children)[0];
                    if (c?.props?.className === 'footnote-ref') {
                        return (
                            <>
                                <span id={pchild.props.id} className={'h-20 inline-block -mt-20'}/>
                                {React.cloneElement(pchild, {id: null})}
                            </>
                        )
                    }
                    console.log(pchild);
                }
                //console.log(pchild);
                return pchild;
            })
            return (
                <p>
                    {paragraph}
                </p>
            );
        });
        return allChildren;
}

export default {
    wrapper: Footnote
}