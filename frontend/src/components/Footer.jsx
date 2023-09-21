export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">© 2023 Mesto Russia</p>
    </footer>
  );
};
