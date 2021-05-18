const newFormHandler = async (event) => {


    const text = document.querySelector('#comment-desc').value.trim();
    const post_id = event.target.getAttribute('data-id');
    console.log(post_id)
    
    if (text) {
        const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ text, post_id}),
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (response.ok) {
        document.location.redirect('/');
        } else {
        alert('Failed to create comment');
        }
    }
};
  
document.querySelector('.new-comment-form').addEventListener('submit', newFormHandler);