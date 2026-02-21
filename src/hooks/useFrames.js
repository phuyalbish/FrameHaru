import { useQuery } from '@tanstack/react-query'
import productsData from '../assets/data/products.json'

// Simulates API call - swap with real endpoint in production
const fetchFrames = async () => {
  await new Promise((r) => setTimeout(r, 300))
  return productsData.frames
}

const fetchSizes = async () => {
  await new Promise((r) => setTimeout(r, 200))
  return productsData.sizes
}

const fetchMatOptions = async () => {
  await new Promise((r) => setTimeout(r, 150))
  return productsData.matOptions
}

const fetchTestimonials = async () => {
  await new Promise((r) => setTimeout(r, 250))
  return productsData.testimonials
}

const fetchGalleryImages = async () => {
  await new Promise((r) => setTimeout(r, 200))
  return productsData.galleryImages
}

const fetchWallLayouts = async () => {
  await new Promise((r) => setTimeout(r, 150))
  return productsData.wallLayouts
}

const fetchFaqs = async () => {
  await new Promise((r) => setTimeout(r, 150))
  return productsData.faqs
}

const fetchDeliveryZones = async () => {
  await new Promise((r) => setTimeout(r, 100))
  return productsData.deliveryZones
}

export function useFrames() {
  return useQuery({ queryKey: ['frames'], queryFn: fetchFrames })
}

export function useSizes() {
  return useQuery({ queryKey: ['sizes'], queryFn: fetchSizes })
}

export function useMatOptions() {
  return useQuery({ queryKey: ['matOptions'], queryFn: fetchMatOptions })
}

export function useTestimonials() {
  return useQuery({ queryKey: ['testimonials'], queryFn: fetchTestimonials })
}

export function useGalleryImages() {
  return useQuery({ queryKey: ['galleryImages'], queryFn: fetchGalleryImages })
}

export function useWallLayouts() {
  return useQuery({ queryKey: ['wallLayouts'], queryFn: fetchWallLayouts })
}

export function useFaqs() {
  return useQuery({ queryKey: ['faqs'], queryFn: fetchFaqs })
}

export function useDeliveryZones() {
  return useQuery({ queryKey: ['deliveryZones'], queryFn: fetchDeliveryZones })
}
