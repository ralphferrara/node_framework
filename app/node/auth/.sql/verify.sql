<existsEmail>
  SELECT
    count(1) as existCount
  FROM
    kc_users
  WHERE
      user_email = ?
  LIMIT 10;
</existsEmail>

<existsPhone>
  SELECT
    count(1) as existCount
  FROM
    kc_users
  WHERE
      user_phone = ?
  LIMIT 10;
</existsPhone>

<failPrevious>
UPDATE
	kc_verifications
SET
  verification_status = 'FL'
WHERE
	fid_user = ? AND
	verification_type = ?;
</failPrevious>

<verifyCount>
SELECT
	  id_verification,
	  fid_user,
    verification_status,
    verification_type,
    verification_value,
    verification_ip_created,
    verification_ip_verified
FROM
	kc_verifications
WHERE
	fid_user = ? OR
	verification_ip_created = ? OR
    verification_ip_verified  = ?
LIMIT 50;
</verifyCount>

<insertVerify>
INSERT INTO kc_verifications (
  fid_user,
  verification_type,
  verification_value,
  verification_salt,
  verification_hash,
  verification_status,
  verification_ip_created,
  verification_expires
) VALUES (
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?
);
</insertVerify>


<getRecord>
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
	fid_user = ? AND
	id_verification = ?
LIMIT 1;
</getRecord>


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
    verification_status = 'OK',
    verification_ip_verified = ?
WHERE
    id_verification = ?
LIMIT 1;
</successVerify>

<successEmail>
UPDATE
    kc_users
SET
    user_status_email = 'OK',
    user_email = ?
WHERE
    id_user =  ?
LIMIT 1;
</successEmail>

<successPhone>
UPDATE
    kc_users
SET
    user_status_phone = 'OK',
    user_phone = ?
WHERE
    id_user =  ?
LIMIT 1;

</successPhone>