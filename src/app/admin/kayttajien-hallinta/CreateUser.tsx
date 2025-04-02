'use client';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "@/components/ui/Button";
import useUserInfo from "@/lib/hooks/get-user.info";
import Dropdown from "@/components/ui/Dropdown";
import SearchableDropdown from "@/components/ui/SearchableDropdown";
import {getAllClubsURL, registrationURL} from "@/lib/APIConstants";

interface CreateUserFormProps {
    isOpen: boolean;
    onClose: () => void;
    onUserCreated: () => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ isOpen, onClose, onUserCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        re_password: '',
        role: '',
        club: ''
    });
    const [selectedRole, setSelectedRole] = useState("user");
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useUserInfo();

    const [selectedClub, setSelectedClub] = useState({
        key: '', value: ''
    });
    const [fetchedClubs, setFetchedClubs] = useState<{key: string, value: string}[]>([]);

    useEffect(() => {
        if (isOpen) {
            fetchClubs();
        }
    }, [isOpen, token]);

    const handleClubSelect = (key: any) => {
        setSelectedClub(key);
        formData.club = key;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    function handleSelectedRoleChange(role: string){
        setSelectedRole(role);
        formData.role = role;
    }

    const fetchClubs = async () => {
        try {
            await axios.get(getAllClubsURL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(result => {
                if (result.data) {
                    const clubs =[];
                    for (const club of result.data) {
                        clubs.push({ key: club.name, value: club.nameNonId})
                    }
                    setFetchedClubs(clubs);
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.re_password) {
            setError(`Salasana ei täsmä, yritä uudelleen!`);
        } else {
            try {
                await axios.post(registrationURL, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(result => {
                    if (result) {
                        onUserCreated();
                        onClose();
                    }
                });
            } catch (err: any) {
                setError(err.response?.data?.message || 'Käyttäjän luonti epäonnistui');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Luo uusi käyttäjä</h2>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form>
                    <div className="space-y-4">
                        <input
                            className='border rounded-lg p-2'
                            id="username"
                            name="username"
                            type={"text"}
                            placeholder="Anna käyttäjänimi"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className='border rounded-lg p-2'
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Anna nimi"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className='border rounded-lg p-2'
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Anna sähköposti"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className='border rounded-lg p-2'
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Syötä salasana"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className='border rounded-lg p-2'
                            id="re_password"
                            name="re_password"
                            type="password"
                            placeholder="Syötä salasana uudelleen"
                            value={formData.re_password}
                            onChange={handleChange}
                            required
                        />
                        <SearchableDropdown
                            options={fetchedClubs}
                            onSelect={handleClubSelect}
                            placeholder="Valitse Seura..."
                            defaultValue={selectedClub}
                        />
                        <Dropdown
                            id="new_user_role"
                            name="role"
                            options={["admin", "user"
                            ]}
                            onChange={(e) => handleSelectedRoleChange(e.target.value)}
                            selected={selectedRole}
                        />
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Peruuta
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            onClick={handleSubmit}
                        >
                            {isLoading ? 'Luodaan...' : 'Luo käyttäjä'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserForm;