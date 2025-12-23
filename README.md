# Django To-Do App 📝

A simple To-Do List application built with **Django** and **Django REST Framework**.  
This project demonstrates a basic backend API with a simple frontend to manage tasks.

---

## 🚀 Features

- Create tasks
- View all tasks
- Update tasks
- Delete tasks
- REST API built with Django REST Framework
- Simple frontend (HTML, CSS, JavaScript)

---

## 🛠 Tech Stack

- Python
- Django
- Django REST Framework
- HTML
- CSS
- JavaScript
- SQLite (default Django database)

---

## 📁 Project Structure
todo_project/
├── manage.py
├── tasks/
│ ├── models.py
│ ├── views.py
│ ├── serializers.py
│ └── urls.py
├── todo_project/
│ ├── settings.py
│ ├── urls.py
│ └── wsgi.py
├── templates/
│ └── index.html
├── static/
│ ├── style.css
│ └── script.js
├── .gitignore
└── README.md

---

## ⚙️ How to Run Locally (Windows)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/django-todo-app.git
cd django-todo-app/todo_project
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate