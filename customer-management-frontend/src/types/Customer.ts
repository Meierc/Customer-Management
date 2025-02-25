export interface Address {
  street: string
  city: string
  postalCode: string
  country: string
  companyName: string
}

export interface ContactPerson {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface Customer {
  _id: string
  name: string
  addresses: Address[]
  contactPersons: ContactPerson[]
  type: 'DEALER' | 'COMPANY' | 'PRIVATE'
}
