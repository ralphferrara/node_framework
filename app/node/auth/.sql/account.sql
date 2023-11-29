<pull>
  SELECT
      id_user,
      fid_media,
      fid_media_cover,
      user_username,
      user_fname,
      user_lname,
      user_birthday,
      user_email,
      user_phone,
      user_status,
      user_status_profile,
      user_status_phone,
      user_status_email,
      user_status_private,
      user_status_dark,
      user_headline,
      user_about,
      user_interests
  FROM
    kc_users,
    kc_user_profiles
  WHERE
      fid_user = id_user AND
      id_user = ?
  LIMIT 1
</pull>

