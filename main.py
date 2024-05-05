import subprocess
import os

def run_project(project_name, port, initial_cwd):
    project_path = os.path.join(initial_cwd, project_name)
    cmd = f"python manage.py runserver 0.0.0.0:{port}"
    print(f"Đang khởi động dự án {project_name} trên cổng {port}...")
    subprocess.Popen(cmd, shell=True, cwd=project_path)  # Sử dụng cwd để chạy command từ project_path

if __name__ == "__main__":
    initial_cwd = os.getcwd()  # Lưu thư mục làm việc ban đầu của main.py

    # Danh sách các dự án và cổng tương ứng
    projects = {
        'book_service': 8000,
        'clothes_service': 8001,
        'mobile_service': 8002,
        'order_service': 8003,
        'user_service': 8004,
        'vnpay_python': 8005,
    }

    # Khởi động từng dự án với các cổng khác nhau
    for project_name, port in projects.items():
        run_project(project_name, port, initial_cwd)
