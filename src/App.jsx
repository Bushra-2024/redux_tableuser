import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, del, filterData, update } from './store/table-users/tableUserSlice'

function App() {
	const data = useSelector(state => state.table_users.filteredData)
	const dispatach = useDispatch()

	const [addName, setaddName] = useState('')
	const [addEmail, setAddEmail] = useState('')
	const [addCity, setAddCity] = useState(false)
	const [addStatus, setAddStatus] = useState('')
	const [addPhone, setAddPhone] = useState('')
	const [open, setOpen] = useState(false)

	const [editName, setEditName] = useState('')
	const [editEmail, setEditEmail] = useState('')
	const [editCity, setEditCity] = useState(false)
	const [editStatus, setEditStatus] = useState('')
	const [editPhone, setEditPhone] = useState('')
	const [Editopen, setEditOpen] = useState(false)
	const [EditId, setEditId] = useState(null)
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
	const [statusFilter, setStatusFilter] = useState('All status');
  const [cityFilter, setCityFilter] = useState('All cities');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatach(filterData({ statusFilter, cityFilter, search }));
  }, [statusFilter, cityFilter, search, dispatach]);

	const handleAdd = () => {
		dispatach(
			add({
				name: addName,
				email: addEmail,
				city: addCity,
				status: addStatus,
				phone: addPhone,
			})
		)
		setaddName('')
		setAddEmail('')
		setAddCity('')
		setAddStatus('')
		setAddPhone('')
		setOpen(false)
	}

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
		localStorage.setItem('theme', theme)
	}, [theme])

	const Editclick = user => {
		setEditId(user.id)
		setEditName(user.name)
		setEditEmail(user.email)
		setEditPhone(user.phone)
		setEditCity(user.city)
		setEditStatus(user.status)
		setEditOpen(true)
	}
	const handleUpdate = () => {
		dispatach(
			update({
				id: EditId,
				name: editName,
				email: editEmail,
				phone: editPhone,
				city: editCity,
				status: editStatus,
			})
		)
		setEditOpen(false)
	}

	return (
		<div>
			<div className='flex justify-between mx-32 my-4 items-center'>
				<h1 className='font-bold text-2xl text-gray-800'>Table Users</h1>
				<div className='space-x-4'>
					<button
						onClick={() => setOpen(true)}
						className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md duration-300 ease-in-out'
					>
						New+
					</button>
					<button
						onClick={() => setTheme('dark')}
						className='bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md duration-300 ease-in-out'
					>
						Dark
					</button>
					<button
						onClick={() => setTheme('light')}
						className='bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md border border-gray-200 duration-300 ease-in-out'
					>
						Light
					</button>
				</div>
			</div>

			<div className='flex justify-between mx-32 mt-10'>
         <div className='flex gap-10'>
			<select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="p-2 border rounded-md w-full"
          >
            <option value="All status">All status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
            className="p-2 border rounded-md w-full"
          >
            <option value="All cities">All cities</option>
            <option value="Dushanbe">Dushanbe</option>
            <option value="Bakhtar">Bakhtar</option>
            <option value="Khujand">Khujand</option>
          </select>
			</div>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="p-2 border rounded-md"
          />
			</div>
			
			<div className='overflow-x-auto mt-20 m-auto'>
				<table className='min-w-[80%] m-auto rounded-lg shadow-md overflow-hidden'>
					<thead className='bg-gray-100'>
						<tr>
							<th className='px-6 py-3 text-left text-md font-semibold text-gray-900 uppercase'>
								ID
							</th>
							<th className='px-6 py-3 text-left text-md font-semibold text-gray-900 uppercase'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-md font-semibold text-gray-900 uppercase'>
								Email
							</th>
							<th className='px-6 py-3 text-left text-md font-semibold text-gray-900 uppercase'>
								City
							</th>
							<th className='px-6 py-3 text-left text-md font-semibold text-gray-900 uppercase'>
								Status
							</th>
							<th className='px-6 py-3 text-left text-md font-semibold text-gray-900 uppercase'>
								Phone
							</th>
							<th className='px-6 py-3 text-left text-md font-semibold text-gray-900 uppercase'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-200'>
						{data.length>0 ?(
						 data.map(user => (
							<tr key={user.id} className=''>
								<td className='px-6 py-4 text-sm dark:text-gray-200 text-gray-700'>
									{user.id}
								</td>
								<td className='px-6 py-4 text-sm dark:text-gray-200 text-gray-700'>
									{user.name}
								</td>
								<td className='px-6 py-4 text-sm dark:text-gray-200 text-gray-700'>
									{user.email}
								</td>
								<td className='px-6 py-4 text-sm dark:text-gray-200 text-gray-700'>
									{user.city}
								</td>
								<td className='px-6 py-4 text-sm'>
									<span
										className={`px-2 py-1 rounded-md text-xs font-semibold ${
											user.status
												? 'text-green-100 bg-green-700'
												: 'text-red-100 bg-red-700'
										}`}
									>
										{user.status ? 'Active' : 'Inactive'}
									</span>
								</td>
								<td className='px-6 py-4 text-sm dark:text-gray-200 text-gray-700'>
									{user.phone}
								</td>
								<td className='px-6 py-4 text-sm space-x-2'>
									<button
										onClick={() => dispatach(del(user.id))}
										className=' border border-gray-300 text-gray-700 font-semibold py-1 px-3 rounded-lg shadow-md hover:border-red-500 hover:bg-red-30300'
									>
										Delete
									</button>
									<button
										onClick={() => dispatach(Editclick(user))}
										className=' border border-gray-300 text-gray-700 font-semibold py-1 px-3 rounded-lg shadow-md hover:border-blue-500 hover:bg-blue-300'
									>
										Edit
									</button>
								</td>
							</tr>
						))):<td colSpan={7} className='text-center m-auto font-bold pt-20 text-[red] text-5xl'>Not Found</td>}
					</tbody>
				</table>
			</div>

			{/* MODALS */}
			{open && (
				<div className='fixed m-auto top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
					<div className='flex flex-col items-center gap-3 rounded-lg bg-white border-black border-2 p-10'>
						<p className='font-bold'>Add user</p>
						<input
							type='text'
							value={addName}
							onChange={e => setaddName(e.target.value)}
							placeholder='Enter name'
							className='p-2 border rounded-md w-full'
						/>
						<input
							type='text'
							value={addEmail}
							onChange={e => setAddEmail(e.target.value)}
							placeholder='Enter email'
							className='p-2 border rounded-md w-full'
						/>
						<input
							type='text'
							value={addPhone}
							onChange={e => setAddPhone(e.target.value)}
							placeholder='Enter phone'
							className='p-2 border rounded-md w-full'
						/>

						<div className='flex flex-col gap-2'>
							<select
								value={addCity}
								onChange={e => setAddCity(e.target.value)}
								className='p-2 border rounded-md'
							>
								<option value=''>Select City</option>
								<option value='Dushanbe'>Dushanbe</option>
								<option value='Bakhtar'>Bakhtar</option>
								<option value='Khujand'>Khujand</option>
							</select>
							<select
								value={addStatus}
								onChange={e => setAddStatus(e.target.value)}
								className='p-2 border rounded-md'
							>
								<option value=''>Select Status</option>
								<option value='Active'>Active</option>
								<option value='Inactive'>Inactive</option>
							</select>
						</div>

						<button
							onClick={handleAdd}
							className='border-blue-500 border-[1px] text-blue-500 font-bold rounded-md hover:bg-blue-200 py-2 px-5'
						>
							Add
						</button>
					</div>
				</div>
			)}

			{Editopen && (
				<div className='fixed m-auto top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
					<div className='flex flex-col items-center gap-3 rounded-lg bg-white border-black border-2 p-10'>
						<p className='font-bold'>Edit Todo</p>
						<input
							type='text'
							value={editName}
							onChange={e => setEditName(e.target.value)}
							placeholder='Enter name'
							className='p-2 border rounded-md w-full'
						/>
						<input
							type='text'
							value={editEmail}
							onChange={e => setEditEmail(e.target.value)}
							placeholder='Enter email'
							className='p-2 border rounded-md w-full'
						/>
						<input
							type='text'
							value={editPhone}
							onChange={e => setAddPhone(e.target.value)}
							placeholder='Enter phone'
							className='p-2 border rounded-md w-full'
						/>
						<div className='flex flex-col gap-2'>
							<select
								value={editCity}
								onChange={e => setEditCity(e.target.value)}
								className='p-2 border rounded-md'
							>
								<option value=''>Select City</option>
								<option value='Dushanbe'>Dushanbe</option>
								<option value='Bakhtar'>Bakhtar</option>
								<option value='Khujand'>Khujand</option>
							</select>

							<select
								value={editStatus ? 'active' : 'inactive'}
								onChange={e =>
									setEditStatus(e.target.value === 'Active' ? true : false)
								}
								className='p-2 border rounded-md'
							>
								<option value='Active'>Active</option>
								<option value='Inactive'>Inactive</option>
							</select>
						</div>

						<button
							onClick={handleUpdate}
							className='border-blue-500 border-[1px] text-blue-500 font-bold rounded-md hover:bg-blue-200 py-2 px-5'
						>
							Update
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
