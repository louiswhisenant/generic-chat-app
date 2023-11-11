import { useState, useEffect } from 'react';

export default function useOnScreen(ref) {
	const [isIntersecting, setIntersecting] = useState(false);

	const observer = new IntersectionObserver(([entry]) =>
		setIntersecting(entry.isIntersecting)
	);

	useEffect(() => {
		observer.observe(ref.current);
		// Remove the observer as soon as the component is unmounted
		return () => {
			observer.disconnect();
		};
	}, []);

	return isIntersecting;
}

//   USAGE
//   const DummyComponent = () => {

//     const ref = useRef()
//     const isVisible = useOnScreen(ref)

//     return <div ref={ref}>{isVisible && `Yep, I'm on screen`}</div>
//   }
