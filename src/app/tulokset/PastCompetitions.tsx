'use client';
import React, { useState, useEffect } from 'react'
import { CompetitionResponse, QueryCompetition } from '@/types/commonTypes';
import Score from './Score';
import Paginator from '../components/Paginator';
import { getCompetitionsByYearQueryUrl } from '@/lib/APIConstants';
import axios from 'axios';
import Input from '@/components/ui/Input';
import { Form, Formik } from 'formik';
import CustomDropdown from '@/components/ui/CustomDropdown';

const PastCompetitions = () => {
	const [content, setContent] = useState<QueryCompetition>();
	const [pageNumber, setPageNumber] = useState(0);
	const [searchYear, setSearchYear] = useState(new Date().getFullYear().valueOf());

	let currentYear = new Date().getFullYear().valueOf();
	let apiUrl = getCompetitionsByYearQueryUrl(searchYear, pageNumber, 5);

	const initialValues = {
		year: `${currentYear}`
	}

	const yearOptions: string[] = [];
	for (let i = 0; i < 5; i++) {
		let year = `${currentYear - i}`;
		yearOptions.push(year);
	}
  
	const fetchContent = async () => {
		try {
			const res = await axios.get(apiUrl, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			setContent(res.data);
		} catch (e: any) {
			console.error(e);
		}
	}

	const handleYearSelect = (e: any) => {
		setSearchYear(e.target.value);
	}

	useEffect(() => {
	fetchContent();
	}, [pageNumber, searchYear])

	useEffect(() => {
	setPageNumber(0);
	}, [searchYear])

	console.log(content);

	if (!content) return scoresNotFound();

	let competitions = content.content;

	const handlePageNumberChange = (page: number) => {
		if (page < 0 || page > content.totalPages - 1) return;
		setPageNumber(page);
	}

	return (
		<div className="p-4">
		<h1 className='text-3xl mb-4'>Viimeisimmät tulokset</h1>
			<div className="flex flex-col items-center mb-8 gap-4">
				<Input
					id="search"
					placeholder="Hae kilpailua"
					type="text"
					onChange={(e) => setSearchYear(parseInt(e.target.value))}
					required={false}
				/>
				<Formik
					id="selectCompScoreYear"
					initialValues={initialValues}
					onSubmit={(values) => {
						
					}}
					>
					<Form
						onChange={(values) => handleYearSelect(values)}
					>
						<div className='flex flex-row items-center gap-4'>
							<h1>Valitse vuosi:</h1>
							<CustomDropdown
								label=""
								name="year"
								placeholder=""
								options={yearOptions}
							/>
						</div>
					</Form>
				</Formik>
			</div>
			{ 
				!(content.totalPages < 2) ?
					<Paginator
						pageNumber={pageNumber}
						totalPages={content.totalPages}
						handlePageNumberChange={handlePageNumberChange}
					/>
				: <div></div>
			}
			{
				(competitions || competitions!.length !== 0) ?
					<Score
						year={searchYear}
						competitionResults={competitions}
					/>
				: scoresNotFound()
			}
		</div>
	)
}

const scoresNotFound = () => {
  return (
		<div className="p-4">
			<h1 className='text-xl'>Tuloksia ei löytynyt</h1>
		</div>
	)
}

export default PastCompetitions;