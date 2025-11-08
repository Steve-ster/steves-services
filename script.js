document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quoteForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const mailtoLink = `mailto:stevensservices10@gmail.com?subject=Quote Request from ${name}&body=${encodeURIComponent(message)}%0A%0AContact Email: ${email}`;
    window.location.href = mailtoLink;
  });
});
