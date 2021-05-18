const newFormHandler = async (event) => {
    // event.preventDefault()

    const text = document.querySelector('#comment-desc').value.trim();
    console.log(event.target)
    // console.log(this.dataset.id)
    // console.log(event.target.dataset.id)
    const post_id = event.target.getAttribute('data-id');
    // console.log(post_id)
    
    if (text) {
        const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ text, post_id}),
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (response.ok) {
            document.location.reload(`/post/${{post_id}}`);
        } else {
        alert('Failed to create comment');
        }
    }
};
  
document.querySelector('.new-comment-form').addEventListener('submit', newFormHandler);