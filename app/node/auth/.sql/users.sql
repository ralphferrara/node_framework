<userByEmail>
		SELECT
			id_user,
			user_private,
			user_username,
			user_email,
			user_password,
			user_status
		FROM
			bs_users
		WHERE
			fid_site = ? AND
			user_email = ?
		LIMIT 1
</userByEmail>

<userByUsername>
		SELECT
			id_user,
			fid_media,
			user_private,
			user_username,
			user_email,
			user_password,
			user_status
		FROM
			bs_users
		WHERE
			fid_site = ? AND
			user_username = ?
		LIMIT 1
</userByUsername>

<userByPhone>
		SELECT
			id_user,
			fid_media,
			user_private,
			user_username,
			user_email,
			user_password,
			user_status
		FROM
			kc_users
		WHERE
			user_phone = ? AND (user_status_phone = 'OK' OR user_status_phone = 'HD')
		LIMIT 1
</userByPhone>


<createSession>
	INSERT INTO bs_users_sessions(
		fid_user,
		session_private,
		session_salt,
		session_ip,
		session_status,
		session_heartbeat,
		session_ua
	) VALUES (
		?,
		?,
		?,
		?,
		'A',
		NOW(),
		?
	);
</createSession>


<userExists>
  SELECT
  (SELECT count(1) FROM bs_users WHERE fid_site = ? AND user_username = ?) as usernameExists,
  (SELECT count(1) FROM bs_users WHERE fid_site = ? AND user_email = ?) as emailExists,
  (SELECT count(1) FROM bs_users WHERE user_private = ?) as privateExists
</userExists>

<createUserEmail>
  INSERT INTO  bs_users (
  	fid_site,
    user_private,
    user_username,
    user_password,
    user_email,
    user_ip
  ) VALUES (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
  );
</createUserEmail>

<IPCreated>
		SELECT
			count(1) as created
		FROM
			bs_users
		WHERE
			user_ip = ?
</IPCreated>


<lastLogin>
		UPDATE
			kc_users
		SET
			user_login = NOW()
		WHERE
			id_user = ?
		LIMIT 1
</lastLogin>

