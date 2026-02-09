import { useState } from "react";
import "../styles.css";

function HomePage() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(false);

  const [form, setForm] = useState({
    ime: "",
    opis: "",
    kategorija: "",
    trajanje: "",
    datum: "",
  });

  function onChange(e) {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      <nav className="navbar">
        <div className="activity-tracker">
          <h1>
            <b>Activity Tracker ⌚</b>
          </h1>
        </div>
      </nav>

      {error && <div className="error">{error}</div>}

      <div className="new-activity">
        <h1>
          <b>Add New Activity</b>
        </h1>

        <form className="form">
          <input
            name="ime"
            placeholder="Activity name"
            value={form.ime}
            onChange={onChange}
          />

          <input
            name="opis"
            placeholder="Description"
            value={form.opis}
            onChange={onChange}
          />

          <input
            name="trajanje"
            placeholder="Duration (minutes)"
            type="number"
            min="1"
            value={form.trajanje}
            onChange={onChange}
          />

          <select
            name="kategorija"
            value={form.kategorija}
            onChange={onChange}
          >
            <option value="">Select category</option>
            <option value="LEARNING">Learning</option>
            <option value="TRAINING">Training</option>
            <option value="COOKING">Cooking</option>
            <option value="READING">Reading</option>
            <option value="WORK">Work</option>
            <option value="FAMILY">Family</option>
            <option value="HEALTH">Health</option>
            <option value="HOUSEHOLD">Household</option>
            <option value="SOCIAL">Social</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            name="datum"
            type="date"
            value={form.datum}
            onChange={onChange}
          />

          <button type="submit">Save</button>
        </form>
      </div>

      <section className="card">
        <h2>Statistics</h2>
        <div className="statistika">
          <div className="stat-row">
            <span>Learning</span>
            <b> min</b>
          </div>
          <div className="stat-row">
            <span>Training</span>
            <b> min</b>
          </div>
          <div className="stat-row">
            <span>Cooking</span>
            <b> min</b>
          </div>
          <div className="stat-row">
            <span>Reading</span>
            <b> min</b>
          </div>
          <div className="stat-row">
            <span>Work</span>
            <b> min</b>
          </div>
          <div className="stat-row">
            <span>Family</span>
            <b> min</b>
          </div>
          <div className="stat-row">
            <span>Health</span>
            <b> min</b>
          </div>

               <div className="stat-row">
            <span>Household</span>
            <b> min</b>
          </div>
          <div className="stat-row">
            <span>Social</span>
            <b> min</b>
          </div>
          <div className="stat-row">
            <span>Other</span>
            <b> min</b>
          </div>
        </div>
      </section>

           <div className="activity-list">
        <h1>
           <b>My Activities</b>
        </h1>

        {activities.length === 0 ? (
           <p>No activities yet</p>
        ) : (
         <ul className="list">
            {activities.map((a) => (
               <li key={a.id} className="item">
                <b>{a.ime}</b> – {a.kategorija} – {a.trajanje} min – {a.datum}
                {a.opis && <div>{a.opis}</div>}
                <button>🗑️</button>
                 </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default HomePage;
