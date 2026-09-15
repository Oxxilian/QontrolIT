import bcrypt


class PasswordService:
    """
    Service voor het veilig hashen en controleren
    van wachtwoorden.
    """

    @staticmethod
    def hash_password(password: str) -> str:
        password_bytes = password.encode("utf-8")

        password_hash = bcrypt.hashpw(
            password_bytes,
            bcrypt.gensalt(),
        )

        return password_hash.decode("utf-8")

    @staticmethod
    def verify_password(
        password: str,
        password_hash: str,
    ) -> bool:

        password_bytes = password.encode("utf-8")
        hash_bytes = password_hash.encode("utf-8")

        return bcrypt.checkpw(
            password_bytes,
            hash_bytes,
        )