
<createSession>
  INSERT INTO
      kc_sessions(
        fid_user,
        session_browser,
        session_guid,
        session_ip,
        session_lastlogin
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        NOW()
      );
</createSession>

<lookupSession>
  SELECT
      id_user,
      session_private,
      session_salt,
      user_status
  FROM
      bs_users_sessions,
      bs_users
  WHERE
      fid_user = id_user AND
      id_user = ? AND
      fid_site = ? AND
      session_private = ?;
</lookupSession>

<deleteSession>
  DELETE FROM
    bs_users_sessions
  WHERE
      session_salt = ?
  LIMIT 1;
</deleteSession>

<updateSession>
  UPDATE
      kc_sessions
  SET
    session_ip = ?,
    session_lastlogin = NOW()
  WHERE
      session_guid = ?
  LIMIT 1;
</updateSession>


