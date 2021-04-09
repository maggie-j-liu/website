import React from 'react';

const useActiveAnchor = (itemIds: string[]) => {
    let [activeAnchor, setActiveAnchor] = React.useState(undefined);
    React.useEffect(() => {
        if (!itemIds.length) {
            return null;
        }
        function onScroll() {
            const viewport = window.innerHeight;
            //target height to switch section
            const target = viewport / 4;
            const heights = itemIds.map(id => {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return {top: rect.top, id: id};
                }
                return {top: 0, id: ''}
            });
            let low = 0, high = heights.length;
            while (low < high) {
                let mid = low + Math.floor((high - low) / 2);
                if (heights[mid].top >= target) {
                    high = mid;
                }
                else {
                    low = mid + 1;
                }
            }
            const idx = Math.max(0, low - 1);
            setActiveAnchor(heights[idx].id);
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
