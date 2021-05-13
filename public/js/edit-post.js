const editButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
    const title = document.querySelector('#post-name').value.trim();
    const content = document.querySelector('#post-desc').value.trim();
        
    const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post');
      }
    }
};


document.querySelectorAll('.edit-post').forEach((element) => {
    element.addEventListener('click', editButtonHandler);
});
