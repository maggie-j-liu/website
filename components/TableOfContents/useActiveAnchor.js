import React from 'react';

const useActiveAnchor = (itemIds) => {
    let [activeAnchor, setActiveAnchor] = React.useState(undefined);
    React.useEffect(() => {
        function onScroll() {
            const heights = itemIds.map(id => {
                const element = document.getElementById(id);
                const rect = element.getBoundingClientRect();
                return {top: rect.top, id: id};
            });
            let first = 0, last = heights.length - 1;
            while (first < last) {
                let mid = first + Math.floor((last - first) / 2);
                if (heights[mid].top >= 0) {
                    last = mid;
                }
                else {
                    first = mid + 1;
                }
            }
            setActiveAnchor(heights[first].id);
        }
        window.addEventListener('scroll', onScroll, {
            capture: true,
            passive: true,
        });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll, true);
    }, [itemIds])
  
    return activeAnchor;
}

export default useActiveAnchor;
