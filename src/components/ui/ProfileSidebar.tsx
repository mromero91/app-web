import { useState, useEffect } from 'react';
import { X, Save, XCircle } from 'lucide-react';
import { useProfile } from '@hooks/useProfile';
import { useUpdateProfile } from '@hooks/useUpdateProfile';
import { getUser } from '@services/storage/tokenStorage';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => Promise<void>;
}

export const ProfileSidebar = ({
  isOpen,
  onClose,
  onUpdate,
}: ProfileSidebarProps) => {
  const { profile, loading: fetchingProfile, fetchProfile } = useProfile();
  const { updateProfile, loading: updatingProfile, error } = useUpdateProfile();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isOpen && !profile) {
      fetchProfile();
    }
  }, [isOpen, profile, fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
      });
      setIsDirty(false);
    }
  }, [profile]);

  const currentUser = getUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile) return;

    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      const updatedUser = {
        ...currentUser,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
      if (updatedUser) {
        localStorage.setItem('aura_user', JSON.stringify(updatedUser));
      }

      await fetchProfile();
      if (onUpdate) {
        await onUpdate();
      }
      onClose();
      setIsDirty(false);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
      });
    }
    setIsDirty(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />

      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Mi Perfil</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {fetchingProfile ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : profile ? (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-sm text-gray-600">{profile.email}</p>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Rol</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {profile.role}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Status</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      profile.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {profile.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={updatingProfile}
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={updatingProfile}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    The email cannot be modified
                  </p>
                </div>

                {isDirty && (
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={updatingProfile}
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updatingProfile}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {updatingProfile ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                )}
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Could not load the profile</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
