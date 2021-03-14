import React from 'react';

const useActiveAnchor = (itemIds, rootMargin = undefined) => {
    const [activeAnchor, setActiveAnchor] = React.useState(undefined);
    let isIntersecting = {};
    const observer = React.useRef(null);
    React.useEffect(() => {
        if (!('IntersectionObserver' in window)) {
            return;
        }
        observer.current = new IntersectionObserver(
            entries => {
                //find if each entry is intersecting, store in isIntersecting
                entries.forEach(entry => {
                    isIntersecting[entry.target.id] = entry.isIntersecting;
                });
                //find first id that is intersecting, set as activeAnchor
                setActiveAnchor(itemIds.find(id => isIntersecting[id]));
            },
            { rootMargin: rootMargin || '0% 0% 0% 0%'}
        );
        console.log(observer.current);
    }, [itemIds]);
    React.useEffect(() => {
        if (!observer.current) {
            return;
        }
        //observe each element
        itemIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                observer.current.observe(element);
            }
        });

        //cleanup function to unobserve the elements
        return () => {
            itemIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    observer.current.unobserve(element);
                }
            });
        };
    });
    return activeAnchor;
}

export default useActiveAnchor;
