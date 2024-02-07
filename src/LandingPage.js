import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <>
      <main>
        <div className={styles.container}>
          <h1>Welcome to My Todo App</h1>
          <p>Organize your tasks with ease.</p>
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/TodoList" className={styles.button}>
            View Todo List
          </Link>
          <Link to="/NewTodoList" className={styles.button}>
            Create New Todo List
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Your Todo App. All rights reserved.</p>
      </footer>
    </>
  );
};

export default LandingPage;
