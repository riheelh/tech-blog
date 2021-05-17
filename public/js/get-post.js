  
const getButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id)
      const response = await fetch(`/api/posts/${id}`, {
        method: 'GET',
      });
      console.log(response)
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to get post');
      }
    }
};


document.querySelectorAll('.get-post').forEach((element) => {
    element.addEventListener('click', getButtonHandler);
});




