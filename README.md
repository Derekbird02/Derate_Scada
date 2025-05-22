import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const ReadModal = ({ isOpen, closeModal, log, modalViewState, user }) => {
    if (!isOpen) return null;

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    //State of Modal. Either View, Half Edit, Full Edit
    const [modalEditState, setModalEditState] = useState(modalViewState);

    //Outage Specific
    const [modalOutageType, setModalOutageType] = useState(log.outage_type); //planned/unplanned
    const [modalOutageclassNameification, setModalOutageclassNameification] = useState(log.outage_classification); //full partial inservice
    const [modalOutageReason, setModalOutageReason] = useState(log.outage_reason);
    const [modalTags, setModalTags] = useState(log.tags);

    //Conditional To Ticket Type
    const [modalSubject, setModalSubject] = useState(log.ticket_subject);
    const [modalStatus, setModalStatus] = useState(log.ticket_status);

    //Generic
    const [modalStartDate, setModalStartDate] = useState(
        log.startdate ? dayjs(log.startdate) : null
    );
    const [modalEndDate, setModalEndDate] = useState(
        log.enddate ? dayjs(log.enddate) : null
    );
    const [modalTimeZone, setModalTimeZone] = useState(log.timezone);
    const [modalSiteContacts, setModalSiteContacts] = useState(log.site_contacts);
    const [modalOfftakers, setModalOfftakers] = useState(log.offtakers);
    const [modalNotes, setModalNotes] = useState(log.notes ? log.notes : "");

    const [updateNotes, setUpdateNotes] = useState("");

    const [actionableClicked, setActionableClicked] = useState(false);
    const [infoClicked, setInfoClicked] = useState(false);

    const ticketStateTypes = {
        Outage: ["Scheduled", "In Progress", "Completed", "Canceled"],
        "Substation Alarm": ["Active", "No Longer Active"],
        Derate: ["Open", "Closed"],
        "Comm Loss": ["No Comms", "Comms Restored"],
    };

    const tags = [
        "NOTAM Required",
        "T.O. Switchman Required",
        "AVR Impacted",
        "Environmental Hazards",
    ];

    const handleTagChanges = (tag) => {
        setModalTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const changeModalEditState = (state) => {
        setModalEditState(state);
    };

    // Toggle the SVG onClick
    const handleActionableClick = (e) => {
        e.preventDefault(); // Prevents any default action (like navigation)
        setActionableClicked(!actionableClicked);
    };
    // Toggle the SVG onClick
    const handleInfoClick = (e) => {
        e.preventDefault(); // Prevents any default action (like navigation)
        setInfoClicked(!infoClicked);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            timeZone: 'UTC',
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        return date.toLocaleString("en-US", options);
    };

    const handleStartDateUpdate = (selectedDate) => {
        setModalStartDate(selectedDate);
    };

    const handleStopDateUpdate = (selectedDate) => {
        setModalEndDate(selectedDate);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const halfUpdateUrl = import.meta.env.VITE_API_SUPPORT_CENTRAL_UPDATE_LOG_HALF;
        const fullUpdateUrl = import.meta.env.VITE_API_SUPPORT_CENTRAL_UPDATE_LOG_FULL;

        let updatedNotes = "";

        if (updateNotes !== "") {
            updatedNotes = modalNotes + '\n\nUpdate:\n\n' + updateNotes;
        } else {
            updatedNotes = modalNotes;
        }

        const updatedStart = modalStartDate ? modalStartDate.utc().format() : null;
        const updatedEnd = modalEndDate ? modalEndDate.utc().format() : null;

        if (modalEditState === "HalfEdit") {
            console.log("Half");
            try {
                await axios.post(halfUpdateUrl, {
                    ticket_id: log.ticket_id,
                    ticket_status: modalStatus,
                    notes: updatedNotes,
                    activeuser: user,
                });
                closeModal();
            } catch (error) {
                console.error("Error Updating (Half)", error);
            }
        }

        if (modalEditState === "FullEdit") {
            console.log("Full");
            try {
                await axios.post(fullUpdateUrl, {
                    ticket_id: log.ticket_id,
                    outage_classification: modalOutageclassNameification,
                    ticket_status: modalStatus,
                    startdate: updatedStart,
                    enddate: updatedEnd,
                    timezone: modalTimeZone,
                    outage_reason: modalOutageReason,
                    outage_type: modalOutageType,
                    ticket_subject: modalSubject,
                    site_contacts: modalSiteContacts,
                    offtakers: modalOfftakers,
                    notes: updatedNotes,
                    tags: modalTags,
                    activeuser: user,

                });
                closeModal();
            } catch (error) {
                console.error("Error Updating (Full)", error);
            }
        }




    };

    return (
        <div
            id="readProductModal"
            tabIndex="-1"
            className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50"
            style={{ display: isOpen ? "flex" : "none" }}
        >
            <div className="relative p-4 w-[100%] h-full">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 rounded-t sm:mb-5 dark:border-gray-700">
                        <div className="mb-2 items-center sm:flex sm:space-x-2">
                            <div className="mb-2 block font-semibold text-gray-900 hover:underline dark:text-white sm:mb-0 sm:flex">
                                {log.sitename} - [ {log.ticket_id} ]
                            </div>

                            <span className="inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                <svg className="me-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" ></path>
                                </svg>
                                {log.ticket_status}
                            </span>

                            {log.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                                >
                                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                                        <path d="M5 13.17a3.001 3.001 0 0 0 0 5.66V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 0 0-2 0v9.17ZM11 20v-9.17a3.001 3.001 0 0 1 0-5.66V4a1 1 0 1 1 2 0v1.17a3.001 3.001 0 0 1 0 5.66V20a1 1 0 1 1-2 0Zm6-1.17V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 1 0-2 0v9.17a3.001 3.001 0 0 0 0 5.66Z" />
                                    </svg>
                                    {tag}
                                </span>
                            ))}

                            <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-gray-300">
                                <svg className="me-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-6 4h6m-6 4h6M6 3v18l2-2 2 2 2-2 2 2 2-2 2 2V3l-2 2-2-2-2 2-2-2-2 2-2-2Z" />
                                </svg>
                                Created By {log.created_person ?? "Unknown SSO"}
                            </span>

                            {log.lastupdate_person && (
                                <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-gray-300">
                                    <svg className="me-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                                        <path stroke="currentColor" clipRule="square" strokeLinejoin="round" strokeWidth="2" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z" />
                                    </svg>
                                    Last Updated By {log.lastupdate_person ?? "Unknown SSO"}
                                </span>
                            )}
                        </div>
                        <div>
                            {modalEditState !== "FullEdit" && (
                                <button
                                    onClick={() => changeModalEditState("FullEdit")}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white ml-2.5 mb-1.5"
                                    data-modal-toggle="readEventModal"
                                >
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                    </svg>

                                    <span className="sr-only">Close modal</span>
                                </button>
                            )}

                            <button
                                onClick={closeModal}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white ml-2.5 mb-1.5"
                                data-modal-toggle="readEventModal"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" ></path>
                                </svg>

                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <dl className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            {/* Ticket Type */}
                            <dt className="mb-2 leading-none text-gray-500 dark:text-gray-400">
                                Event Type
                            </dt>
                            <dd className="mb-4 font-medium text-gray-900 sm:mb-5 dark:text-white  border-b border-gray-300 dark:border-gray-600">
                                {log.ticket_type ?? "Not Applicable"}
                            </dd>

                            {/* Outage Specific Fields  */}
                            {log.ticket_type && log.ticket_type === "Outage" && (
                                <>
                                    {/* Outage Type */}
                                    <dt className="mb-2 leading-none text-gray-500 dark:text-gray-400">
                                        Outage Type
                                    </dt>
                                    {modalEditState === "FullEdit" ? (
                                        <select
                                            value={modalOutageType}
                                            onChange={(event) =>
                                                setModalOutageType(event.target.value)
                                            }
                                            id="status"
                                            className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value="" disabled>
                                                Outage Type
                                            </option>
                                            <option value="Planned">Planned</option>
                                            <option value="Unplanned">Unplanned</option>
                                        </select>
                                    ) : (
                                        <dd className="mb-4 font-medium text-gray-900 sm:mb-5 dark:text-white  border-b border-gray-300 dark:border-gray-600">
                                            {log.outage_type ?? "Not Applicable"}
                                        </dd>
                                    )}

                                    {/* Outage Category */}
                                    <dt className="mb-2 leading-none text-gray-500 dark:text-gray-400">
                                        Outage Category
                                    </dt>
                                    {modalEditState === "FullEdit" ? (
                                        <select
                                            value={modalOutageclassNameification}
                                            onChange={(event) =>
                                                setModalOutageclassNameification(event.target.value)
                                            }
                                            id="status"
                                            className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value="" disabled>
                                                Outage classNameification
                                            </option>
                                            <option value="Full Outage">Full Outage</option>
                                            <option value="Partial Outage">Partial Outage</option>
                                            <option value="In Service">In Service</option>
                                        </select>
                                    ) : (
                                        <dd className="mb-4 font-medium text-gray-900 sm:mb-5 dark:text-white  border-b border-gray-300 dark:border-gray-600">
                                            {log.outage_classNameification ?? "Not Applicable"}
                                        </dd>
                                    )}
                                </>
                            )}

                            {/* Ticket Status */}
                            <dt className="mb-2 leading-none text-gray-500 dark:text-gray-400">
                                Ticket Status
                            </dt>

                            {modalEditState === "HalfEdit" ||
                                modalEditState === "FullEdit" ? (
                                <select
                                    value={modalStatus}
                                    onChange={(event) => setModalStatus(event.target.value)}
                                    id="status"
                                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="" disabled>
                                        Select Timezone
                                    </option>
                                    {ticketStateTypes[log.ticket_type]?.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <dd className="mb-4 font-medium text-gray-900 sm:mb-5 dark:text-white  border-b border-gray-300 dark:border-gray-600">
                                    {log.ticket_subject}
                                </dd>
                            )}

                            {/* Ticket Subject */}
                            <dt className="mb-2 leading-none text-gray-500 dark:text-gray-400">
                                {log.ticket_type === "Outage"
                                    ? "Impacted Compoents"
                                    : log.ticket_type === "Derate"
                                        ? "Derate Values"
                                        : log.ticket_type === "Substation Alarm"
                                            ? "Alarm Name"
                                            : log.ticket_type === "Comm Loss"
                                                ? "Communication Impact"
                                                : "Unknown"}
                            </dt>

                            {modalEditState === "FullEdit" ? (
                                <input
                                    value={modalSubject}
                                    onChange={(event) => setModalSubject(event.target.value)}
                                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            ) : (
                                <dd className="mb-4 font-medium text-gray-900 sm:mb-5 dark:text-white  border-b border-gray-300 dark:border-gray-600">
                                    {modalSubject}
                                </dd>
                            )}

                            {/* Outage Reason */}
                            {log.outage_reason && (
                                <>
                                    <dt className="mb-2 leading-none text-gray-500 dark:text-gray-400">
                                        Reason For Work
                                    </dt>

                                    {modalEditState === "FullEdit" ? (
                                        <input
                                            value={modalOutageReason}
                                            onChange={(event) =>
                                                setModalOutageReason(event.target.value)
                                            }
                                            className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    ) : (
                                        <dd className="mb-4 font-medium text-gray-900 sm:mb-5 dark:text-white  border-b border-gray-300 dark:border-gray-600">
                                            {modalOutageReason ?? "Not Applicable"}
                                        </dd>
                                    )}
                                </>
                            )}

                            {/* Start Date */}
                            <dt className="mb-2 leading-none text-gray-500 dark:text-gray-400">
                                Start Date & Time
                            </dt>
                            {modalEditState === "FullEdit" ? (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DateTimePicker"]}>
                                        <DateTimePicker
                                            timezone="UTC"
                                            label="Outage Start Date"
                                            value={modalStartDate}
                                            onChange={handleStartDateUpdate}
                                            ampm={false}
                                            timeSteps={{ hours: 1, minutes: 1 }}
                                            className="block p-2.5 w-full text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            sx={{
                                                svg: { color: "#FFFFFF" },
                                                input: { color: "#FFFFFF" },
                                                label: { color: "#FFFFFF" },
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            ) : (
                                <dd className="mb-4 font-medium text-gray-900 sm:mb-5 dark:text-white  border-b border-gray-300 dark:border-gray-600">
                                    {formatDate(modalStartDate)} ({modalTimeZone})
                                </dd>
                            )}

                            {/* End Date */}
                            <dt className="mb-2 leading-none text-gray-500 dark:text-gray-400">
                                End Date & Time
                            </dt>
                            {modalEditState === "FullEdit" ? (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DateTimePicker"]}>
                                        <DateTimePicker
                                            timezone="UTC"
                                            label="Outage End Date"
                                            value={modalEndDate}
                                            onChange={handleStopDateUpdate}
                                            ampm={false}
                                            timeSteps={{ hours: 1, minutes: 1 }}
                                            className="block p-2.5 w-full text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            sx={{
                                                svg: { color: "#FFFFFF" },
                                                input: { color: "#FFFFFF" },
                                                label: { color: "#FFFFFF" },
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            ) : modalEndDate ? (
                                <dd className="mb-4 font-medium text-gray-900 sm:mb-5 dark:text-white  border-b border-gray-300 dark:border-gray-600">
                                    {formatDate(modalEndDate)} ({modalTimeZone})
                                </dd>
                            ) : (
                                <dd className="mb-4 font-medium text-gray-900 sm:mb-5 dark:text-white  border-b border-gray-300 dark:border-gray-600">
                                    No End Date Specified
                                </dd>
                            )}

                            {/* Ticket Status */}
                            {modalEditState === "FullEdit" && (
                                <>
                                    <dt className="mb-2 mt-4 leading-none text-gray-500 dark:text-gray-400">
                                        Timezone
                                    </dt>

                                    <select
                                        value={modalTimeZone}
                                        onChange={(event) => setModalTimeZone(event.target.value)}
                                        id="timezone"
                                        className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    >
                                        <option value="" disabled>
                                            Select Timezone
                                        </option>
                                        <option value="EST/EDT">EST/EDT</option>
                                        <option value="CST/CDT">CST/CDT</option>
                                        <option value="MST/MDT">MST/MDT</option>
                                        <option value="PST/PDT">PST/PDT</option>
                                        <option value="HST">HST</option>
                                    </select>
                                </>
                            )}

                            {/* Site Contacts */}
                            <dt className="mb-2 mt-3 leading-none text-gray-500 dark:text-gray-400">
                                Site Contacts
                            </dt>
                            {modalEditState === "FullEdit" ? (
                                <textarea
                                    value={modalSiteContacts}
                                    onChange={(event) => setModalSiteContacts(event.target.value)}
                                    id="siteContacts"
                                    rows="4"
                                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter any site point of contacts..."
                                ></textarea>
                            ) : (
                                <dd className="whitespace-pre-wrap mb-4 font-medium text-gray-900 sm:mb-5 dark:text-white  border-b border-gray-300 dark:border-gray-600">
                                    {modalSiteContacts}
                                </dd>
                            )}

                            {/* Offtakers */}
                            <dt className="mb-2 leading-none text-gray-500 dark:text-gray-400">
                                Offtakers
                            </dt>
                            {modalEditState === "FullEdit" ? (
                                <textarea
                                    value={modalOfftakers}
                                    onChange={(event) => setModalOfftakers(event.target.value)}
                                    id="siteOfftakers"
                                    rows="4"
                                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter any site point of contacts..."
                                ></textarea>
                            ) : (
                                <dd className="whitespace-pre-wrap mb-4 font-medium text-gray-900 sm:mb-5 dark:text-white  border-b border-gray-300 dark:border-gray-600">
                                    {modalOfftakers}
                                </dd>
                            )}
                            {modalEditState === "FullEdit" && (
                                <div>
                                    <dt className="mb-2 leading-none text-gray-500 dark:text-gray-400">
                                        Tags
                                    </dt>
                                    {tags.map((tag) => (
                                        <div className="flex items-center mr-4" key={tag}>
                                            <input
                                                id={`inline-checkbox-${tag}`}
                                                type="checkbox"
                                                checked={modalTags.includes(tag)}
                                                onChange={() => handleTagChanges(tag)}
                                                className="w-4 h-4 bg-gray-100 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor={`inline-checkbox-${tag}`}
                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {tag}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </dl>

                        <dl>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white mt-4">
                                <p className="text-base font-semibold text-gray-900 dark:text-white lg:mt-4">
                                    Event Notes
                                </p>
                            </dt>

                            {modalEditState === "FullEdit" ? (
                                <textarea
                                    value={modalNotes}
                                    onChange={(event) => setModalNotes(event.target.value)}
                                    id="notes"
                                    rows="35"
                                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter any relevant notes about this event..."
                                ></textarea>
                            ) : (
                                <dd className="font-light text-gray-500 dark:text-gray-400">
                                    {log.notes && log.notes.length > 0 ? (
                                        <pre className="whitespace-pre-wrap">{modalNotes}</pre>
                                    ) : (
                                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            No Notes For Event
                                        </p>
                                    )}
                                </dd>
                            )}
                        </dl>
                    </div>

                    {(modalEditState === "HalfEdit" || modalEditState === "FullEdit") && (
                        <div className="w-full">
                            <label
                                htmlFor="notes"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                New Notes
                            </label>
                            <textarea
                                id="notes"
                                rows="4"
                                value={updateNotes}
                                onChange={(event) => setUpdateNotes(event.target.value)}
                                className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter any relevant notes about this event..."
                            ></textarea>
                        </div>
                    )}

                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

                    {(modalEditState === "HalfEdit" ||
                        modalEditState === "FullEdit") && (
                            <div className="flex">
                                <div className="w-full">

                                    <label
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                        htmlFor="guest-permission-checkbox"
                                    >
                                        Notification Preferences
                                    </label>
                                    <p className="text-xs mb-2 font-light text-gray-500 dark:text-gray-400">
                                        Select who will have access to view this log
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <button
                                                onClick={handleActionableClick}
                                                className="flex justify-center items-center"
                                            >
                                                {!actionableClicked ? (
                                                    <svg className="w-5 h-5 text-gray-800 dark:text-white mr-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                                                        <path fillRule="evenodd" d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5 text-gray-800 dark:text-white mr-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                                                        <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>

                                            <input
                                                id="guest-permission-checkbox"
                                                type="checkbox"
                                                value=""
                                                defaultChecked
                                                className="w-4 h-4 bg-gray-100 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="guest-permission-checkbox"
                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Actionable{" "}
                                                <span className="text-xs font-light text-gray-500 dark:text-gray-400 ml-2">
                                                    (Sent directly to customers, site personnel, or off-takers)
                                                </span>
                                            </label>
                                        </div>

                                        {actionableClicked && (
                                            <>
                                                <div className="flex space-x-1">
                                                    <div className="flex items-center rounded-lg border border-gray-200 bg-white px-2 py-1 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                        <span className="text-xs font-light text-gray-500 dark:text-gray-400">
                                                            derekbird@tenaska.co
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center rounded-lg border border-gray-200 bg-white px-2 py-1 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                        <span className="text-xs font-light text-gray-500 dark:text-gray-400">
                                                            sshah@atco.co
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className="flex items-center">
                                            <button
                                                onClick={handleInfoClick}
                                                className="flex justify-center items-center"
                                            >
                                                {!infoClicked ? (
                                                    <svg className="w-5 h-5 text-gray-800 dark:text-white mr-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                                                        <path fillRule="evenodd" d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5 text-gray-800 dark:text-white mr-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                                                        <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>

                                            <input
                                                id="guest-permission-checkbox"
                                                type="checkbox"
                                                value=""
                                                defaultChecked
                                                className="w-4 h-4 bg-gray-100 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="guest-permission-checkbox"
                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Informational
                                            </label>
                                        </div>
                                        {infoClicked && (
                                            <>
                                                <div className="flex space-x-1">
                                                    <div className="flex items-center rounded-lg border border-gray-200 bg-white px-2 py-1 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                        <span className="text-xs font-light text-gray-500 dark:text-gray-400">
                                                            derekbird@tenaska.co
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center rounded-lg border border-gray-200 bg-white px-2 py-1 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                        <span className="text-xs font-light text-gray-500 dark:text-gray-400">
                                                            sshah@atco.co
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="button"
                                        className="w-full h-full text-white inline-flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        onClick={handleSubmit}
                                    >
                                        <svg className="-ml-1 w-5 h-5 sm:mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                        </svg>
                                        Update Event
                                    </button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

ReadModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    log: PropTypes.shape({
        sitename: PropTypes.string.isRequired,
        event_id: PropTypes.string.isRequired,
        passdown_category: PropTypes.string.isRequired,
        passdown_state: PropTypes.string.isRequired,
        createdby: PropTypes.string,
        lastupdatedby: PropTypes.string,
        event_type: PropTypes.string.isRequired,
        event_category: PropTypes.string,
        start_datetime: PropTypes.number.isRequired,
        end_datetime: PropTypes.number.isRequired,
        time_zone: PropTypes.string.isRequired,
        notam_required: PropTypes.string,
        long_term_known_issue: PropTypes.string,
        event_description: PropTypes.string,
        impacted_components: PropTypes.string,
        reason_work: PropTypes.string,
        notes: PropTypes.string,
    }).isRequired,
};

export default ReadModal;
