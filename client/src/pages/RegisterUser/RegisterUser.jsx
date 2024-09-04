import { useState, useEffect } from 'react';
import { addTeacher } from '../../api/user';
import './_registerUser.scss';
import useHeadingStore from '../../store/zustand/useHeadingStore';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { Autocomplete, TextField, List, ListItem, IconButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchInternalDegrees } from '../../api/degree';
import { Icon } from '@iconify/react';

const Notification = ({ success, onTimeout, time = 3 }) => {
	const [haveTime, setHaveTime] = useState(true);

	useEffect(() => {
		const id = setTimeout(() => {
			setHaveTime(false);
			onTimeout();
		}, time * 1000);
		return () => clearTimeout(id);
	}, [onTimeout, time]);

	if (!haveTime) {
		return null;
	}

	return (
		<div className={`notification ${success ? 'success' : 'error'}`}>
			{success ? 'Opettaja lisätty onnistuneesti!' : 'Opettajan lisäys epäonnistui. Yritä uudelleen.'}
		</div>
	);
};

const RegisterUser = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		role: 'teacher',
		permissions: 'admin',
		degrees: [], // Store degree IDs here
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(null);
	const navigate = useNavigate();
	const [selectedDegrees, setSelectedDegrees] = useState([]);
	const [inputValue, setInputValue] = useState('')

	const { setSubHeading, setHeading } = useHeadingStore();

	// Fetch degrees using react-query
	const { data: fetchedDegrees = [] } = useQuery({
		queryKey: ['degrees'],
		queryFn: fetchInternalDegrees,
	});

	const onTimeout = () => setSuccess(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleRadioChange = (value) => {
		setFormData({ ...formData, permissions: value });
	};

	const handleDegreeChange = (event, value) => {
		const selectedDegree = fetchedDegrees.find(degree => degree.name.fi === value);

		if (selectedDegree && !selectedDegrees.includes(selectedDegree.name.fi)) {
			// Update selected degrees with the name for display
			setSelectedDegrees((prevDegrees) => [...prevDegrees, selectedDegree.name.fi]);

			// Update formData with the degree ID
			setFormData((prevFormData) => ({
				...prevFormData,
				degrees: [...prevFormData.degrees, selectedDegree._id]
			}));

			setInputValue('');
		}
	};

	const handleRemoveDegree = (degreeToRemove) => {
		const degreeIndex = selectedDegrees.indexOf(degreeToRemove);

		if (degreeIndex > -1) {
			// Remove selected degree from the list
			setSelectedDegrees((prevDegrees) =>
				prevDegrees.filter((degree) => degree !== degreeToRemove)
			);

			// Remove the degree ID from formData
			setFormData((prevFormData) => {
				const newDegrees = [...prevFormData.degrees];
				newDegrees.splice(degreeIndex, 1); // Remove the degree ID at the same index
				return {
					...prevFormData,
					degrees: newDegrees
				};
			});
		}
	};

	useEffect(() => {
		setSubHeading('Lisää uusi opettaja');
		setHeading('Lisää uusi opettaja');
	}, [setHeading, setSubHeading]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await addTeacher(formData);
			setSuccess(true);
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				role: 'teacher',
				permissions: 'admin',
				degrees: []
			});
			setSelectedDegrees([]); // Clear the selected degrees list
		} catch (error) {
			console.error('Error with registration: ', error);
			setSuccess(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="register-user">
			{success !== null && <Notification onTimeout={onTimeout} success={success} time={5} />}
			<form onSubmit={handleSubmit}>
				<div className="form-container">
					<label className="section-title">Perustiedot</label>
					<div className="form-group">
						<label htmlFor="firstName">Etunimi*:</label>
						<input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
					</div>
					<div className="form-group">
						<label htmlFor="lastName">Sukunimi*:</label>
						<input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
					</div>
					<div className="form-group">
						<label htmlFor="email">Sähköposti*:</label>
						<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
					</div>
				</div>

				<div className="form-container">
					<label className="section-title">Opettajan käyttöoikeudet*</label>
					<FormControl>
						<RadioGroup
							aria-labelledby="demo-form-control-label-placement"
							name="permissions"
							value={formData.permissions}
							onChange={(e) => handleRadioChange(e.target.value)}
						>
							<FormControlLabel
								value="admin"
								sx={{
									'& .MuiSvgIcon-root': {
										marginRight: '8px',
									},
								}}
								control={<Radio />}
								label="Admin"
							/>
							<FormControlLabel
								value="user"
								sx={{
									'& .MuiSvgIcon-root': {
										marginRight: '8px',
									},
								}}
								control={<Radio />}
								label="Peruskäyttäjä"
							/>
						</RadioGroup>
					</FormControl>
				</div>

				<div className="form-container">
					<label className="section-title">Opettajan tutkinnot*</label>

					<Autocomplete
						disablePortal
						options={fetchedDegrees.map((degree) => degree.name.fi)}
						onChange={handleDegreeChange}
						value={null} // Don't control the selected option
						inputValue={inputValue} // Control the input field
						onInputChange={(event, newInputValue) => {
							setInputValue(newInputValue); // Update input value on change
						}}
						sx={{
							'& .MuiAutocomplete-inputRoot': {
								width: '100%',
								padding: '12px',
								fontSize: '16px',
								borderRadius: '0px',
								boxSizing: 'border-box',
								border: '2px solid black',
								backgroundColor: 'white',
								overflow: 'hidden',
							},
							'& .MuiInputBase-input': {
								padding: '0px', // Remove inner padding
								whiteSpace: 'nowrap', // Prevent wrapping
								overflow: 'hidden', // Prevent overflow
								textOverflow: 'ellipsis', // Display ellipsis for overflow text
							},
							'& .MuiOutlinedInput-notchedOutline': {
								border: 'none', // Remove the default MUI border
							},
						}}

						renderInput={(params) => (
							<TextField
								{...params}
								label="" // Empty label to remove floating effect
								placeholder="Etsi tai kirjoita tutkinnon nimi" // Use placeholder instead of label
								InputLabelProps={{
									shrink: false, // Prevent label from moving
								}}
							/>
						)}
					/>
					{/* Display selected degrees as a list */}
					<List>
						{selectedDegrees.map((degree, index) => (
							<ListItem key={index}
								sx={{
									width: '100%',
									padding: '12px',
									fontSize: '16px',
									borderRadius: '0px',
									boxSizing: 'border-box',
									border: '2px solid black',
									backgroundColor: 'white',
									marginBottom: '8px', // Add some space between items
								}}

								secondaryAction={
									<IconButton edge="end" onClick={() => handleRemoveDegree(degree)}>
										<Icon
											icon='material-symbols:delete-outline'
											color='#B01038'
											height='18'
											preserveAspectRatio='xMinYMid meet'
										/>

									</IconButton>
								}>
								<ListItemText primary={degree} />
							</ListItem>
						))}
					</List>

				</div>

				<PageNavigationButtons
					handleBack={() => navigate(-1)}
					handleForward={handleSubmit}
					forwardButtonText="Lisää opettaja"
					showForwardButton={true}
				/>
			</form>
		</div>
	);
};

export default RegisterUser;

