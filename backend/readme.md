pip freeze > requirements.txt

ーーーーーーーここからーーーーーー
■ 環境構築
python -m venv venv
venv\Scripts\activate # Linux source venv/bin/activate

pip install -r requirements.txt
如果出错，尝试下面的
pip install -r requirements.txt --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org

set ENV=local
uvicorn run:app --host 0.0.0.0 --port 8000 --reload
