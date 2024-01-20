import Link from "next/link";
export default ({ currentUser }) => {
  <Link className="navbar-brand" href="/">
    GitTix
  </Link>;
  <div className="d-flex justify-content-end">
    <ul className="nav d-flex align-items-center">
      {currentUser ? "Sign out" : "Sign in/up"}
    </ul>
  </div>;
};

