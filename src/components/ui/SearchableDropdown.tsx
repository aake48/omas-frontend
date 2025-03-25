import React, {useState, useEffect, useRef} from 'react';

const SearchableDropdown = ({
                                options,
                                placeholder = 'Valitse...',
                                onSelect,
                                disabled = false,
                                defaultValue = null
                            }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        if (defaultValue && options) {
            const defaultOption = options.find(opt => opt.key === defaultValue);
            if (defaultOption) {
                setSelectedOption(defaultOption);
                setInputValue(defaultOption.value);
            }
        }
    }, [defaultValue, options]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value === '') {
            setFilteredOptions(options);
            setSelectedOption(null);
            onSelect(null);
        } else {
            const filtered = options.filter(option =>
                option.value.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setInputValue(option.value);
        onSelect(option.key);
        setIsOpen(false);
    };

    const handleInputClick = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            setFilteredOptions(options);
        }
    };

    const handleClear = () => {
        setInputValue('');
        setSelectedOption(null);
        onSelect(null);
        setFilteredOptions(options);
    };

    return (
        <div className="searchable-dropdown" ref={dropdownRef}>
            <div className="dropdown-input-container">
                <input
                    className="py-2 text-xl bg-white placeholder:bg-gray-500 border-slate-500 text-black px-3 min-w-0 border rounded-lg"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {selectedOption && (
                    <button className="clear-button" onClick={handleClear}>
                        ×
                    </button>
                )}
                <button
                    className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={disabled}
                >

                </button>
            </div>

            {isOpen && (
                <div className="dropdown-options">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <div
                                key={option.key}
                                className={`dropdown-option ${
                                    selectedOption?.key === option.key ? 'selected' : ''
                                }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.value}
                            </div>
                        ))
                    ) : (
                        <div className="dropdown-option no-results">No options found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchableDropdown;