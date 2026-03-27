from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from utils.response import success, error
from utils.security import hash_password, check_password
from extensions import db
from models import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    # Stricter validation
    required_fields = ['phone', 'password', 'role', 'name']
    for field in required_fields:
        if not data.get(field):
            return error(f"Missing required field: {field}")
    phone = data.get('phone')
    password = data.get('password')
    role = data.get('role')
    name = data.get('name')
    if User.query.filter_by(phone=phone).first():
        return error("Phone already registered")
    if len(password) < 6:
        return error("Password must be at least 6 characters")
    if role not in ['farmer', 'buyer', 'godown_owner']:
        return error("Invalid role")
    hashed = hash_password(password)
    new_user = User(
        phone=phone,
        password=hashed,
        role=role,
        name=name,
        village=data.get("village", ""),
        district=data.get("district", ""),
        state=data.get("state", "")
    )
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return error(f"Error registering user: {str(e)}", 500)
    return success("User registered")

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    # Stricter validation
    required_fields = ['phone', 'password']
    for field in required_fields:
        if not data.get(field):
            return error(f"Missing required field: {field}")
    phone = data.get('phone')
    password = data.get('password')
    user = User.query.filter_by(phone=phone).first()
    if not user or not check_password(password, user.password):
        return error("Invalid phone or password", 401)
    try:
        token = create_access_token(identity={
            "user_id": str(user.id),
            "role": user.role,
            "phone": user.phone,
            "name": user.name
        })
    except Exception as e:
        return error(f"Error generating token: {str(e)}", 500)
    return jsonify({"success": True, "message": "Login successful", "token": token})

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    identity = get_jwt_identity()
    user = User.query.filter_by(phone=identity['phone']).first()
    if not user:
        return error("User not found", 404)
    user_data = {
        "id": str(user.id),
        "phone": user.phone,
        "name": user.name,
        "role": user.role,
        "village": user.village,
        "district": user.district,
        "state": user.state
    }
    return success("User info", user_data)
