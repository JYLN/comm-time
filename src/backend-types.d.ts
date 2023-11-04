/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Customers = "customers",
	TimeEntries = "time_entries",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CustomersRecord = {
	name?: string
}

export type TimeEntriesRecord = {
	author: RecordIdString
	customer: RecordIdString
	elapsed_time: number
	end_time: IsoDateString
	name: string
	notes?: HTMLString
	shared_users?: RecordIdString[]
	start_time: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CustomersResponse<Texpand = unknown> = Required<CustomersRecord> & BaseSystemFields<Texpand>
export type TimeEntriesResponse<Texpand = unknown> = Required<TimeEntriesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	customers: CustomersRecord
	time_entries: TimeEntriesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	customers: CustomersResponse
	time_entries: TimeEntriesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'customers'): RecordService<CustomersResponse>
	collection(idOrName: 'time_entries'): RecordService<TimeEntriesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
