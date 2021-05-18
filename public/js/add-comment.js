const newFormHandler = async (event) => {
    event.preventDefault();

    const desc = document.querySelector('#comment-desc').value.trim();
    // add post ID , use the post-id dataset idea
    const post_id = event.target.getAttribute('data-id');

    if (desc) {
        const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ desc, post_id }),
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert('Failed to create comment');
        }
    }
};
  
document.querySelector('.new-comment-form').addEventListener('submit', newFormHandler);