import { useState, useEffect } from "react";
import { getUserProfile } from "../api/userActions";

export const useUserProfile = () => {
  const [user, setUser] = useState<{ id: string; username: string } | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch user profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { user, loading, error };
};
