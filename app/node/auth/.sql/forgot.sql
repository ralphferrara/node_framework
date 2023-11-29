

  <insertReset>
    INSERT INTO kc_verifications (
      fid_user,
      verification_value,
      verification_type,
      verification_salt,
      verification_hash,
      verification_status,
      verification_ip_created,
      verification_expires
    ) VALUES (
      ?,
      ?,
      'RS',
      ?,
      ?,
      ?,
      ?,
      ?
    );
  </insertReset>

  <pullVerify>
    SELECT
        id_verification,
        fid_user,
        verification_status,
        verification_type,
        verification_value,
        verification_salt,
        verification_hash,
        verification_attempts
    FROM
      kc_verifications
    WHERE
      id_verification = ?
    LIMIT 1;
  </pullVerify>

  <failMax>
      UPDATE
          kc_verifications
      SET
          verification_status = 'FL',
          verification_ip_verified = ?
      WHERE
          id_verification = ?
      LIMIT 1;
  </failMax>

  <failAttempt>
        UPDATE
            kc_verifications
        SET
            verification_attempts = (verification_attempts + 1),
            verification_ip_verified = ?
        WHERE
            id_verification = ?
        LIMIT 1;
  </failAttempt>

  <successVerify>
  UPDATE
      kc_verifications
  SET
      verification_status = 'AW',
      verification_ip_verified = ?
  WHERE
      id_verification = ?
  LIMIT 1;
  </successVerify>

  <resetVerify>
    SELECT
        id_verification,
        fid_user,
        verification_status
    FROM
        kc_verifications
    WHERE
        fid_user = ? AND
        id_verification = ?
    LIMIT 1;
  </resetVerify>

  <updatePassword>
    UPDATE
        kc_users
    SET
        user_password = ?
    WHERE
        id_user = ?
    LIMIT 1;
  </updatePassword>

  <resetUpdate>
    UPDATE
        kc_verifications
    SET
        verification_status = 'OK'
    WHERE
        fid_user = ? AND
        id_verification = ?
    LIMIT 1;
  </resetUpdate>