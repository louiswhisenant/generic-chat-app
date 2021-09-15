import { useState } from 'react';

const Bookmarks = () => {
	const [open, setOpen] = useState(false);

	const onBookmarkClick = () => {
		console.log('Bookmark was clicked');
	};

	return (
		<div id='bookmarks-anchor'>
			<div
				className='bookmarks-trigger'
				onClick={() => {
					setOpen(!open);
				}}>
				<i className='fas fa-bookmark'></i>
			</div>

			{open && (
				<div className='bookmarks'>
					<i
						className='fas fa-times bookmarks-close'
						onClick={() => {
							setOpen(false);
						}}></i>
					<div className='bookmark' onClick={onBookmarkClick}>
						<small className='bookmark-date'>Aug 15</small>
						<p className='bookmark-text'>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Laudantium asperiores sunt saepe
							necessitatibus laborum nisi.
						</p>
						<hr />
					</div>
					<div className='bookmark' onClick={onBookmarkClick}>
						<small className='bookmark-date'>Aug 15</small>
						<p className='bookmark-text'>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Laudantium asperiores sunt saepe
							necessitatibus laborum nisi.
						</p>
						<hr />
					</div>
					<div className='bookmark' onClick={onBookmarkClick}>
						<small className='bookmark-date'>Aug 15</small>
						<p className='bookmark-text'>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Laudantium asperiores sunt saepe
							necessitatibus laborum nisi.
						</p>
						<hr />
					</div>
					<div className='bookmark' onClick={onBookmarkClick}>
						<small className='bookmark-date'>Aug 15</small>
						<p className='bookmark-text'>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Laudantium asperiores sunt saepe
							necessitatibus laborum nisi.
						</p>
						<hr />
					</div>
				</div>
			)}
		</div>
	);
};

export default Bookmarks;
