import Link from "next/link";

export default function Success() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Thank You for Your Purchase!
        </h2>
        <p className="text-gray-700 mb-6">
          We appreciate your business and hope you enjoy your new product. If
          you have any questions or need further assistance, please don&lsquo;t
          hesitate to contact us.
        </p>

        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          <Link href="/products" className="hover:underline">
            View More Products
          </Link>
        </button>
        <div className="mt-6 text-gray-500 text-sm">
          Your order number is <span className="font-bold">#123456</span>.
          Please keep this number for your records.
        </div>
      </div>
    </div>
  );
}
