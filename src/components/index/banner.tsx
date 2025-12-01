export default function Banner(): JSX.Element {
  return (
    <section className="w-full">
      <div className="@container">
        <div className="@[480px]:p-4">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 items-center justify-center p-4 text-center"
            data-alt="Abstract fiery explosion background for the game"
            style={{
              backgroundImage:
                'linear-gradient(rgba(37, 40, 42, 0.7) 0%, rgba(37, 40, 42, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBOedcTpX7ZIw1jmHyV3sAdHuy-fgLZW19YcY-ZRMvi586AOX09NZ1TKBLZHmYNnVvSVYPUOrKrS0SGgU3A0UGevObHrfIkPWpTR7MGt2bi_Xo9D-75CJ5zuD7lNBH05Dtv0eUB3UUCwSZSGLzl9sZqfwBTbS0PNZ-nTNGyz6B_JRxUfFHLrIhAzc_m0EkrM7wqtbR775gYxL4Lbxmvc4aUI9TqukNaas-MlrWRlR40jKatcgoaw4yFfyxuCpO4LtC7oOxk9LvIcxP2")',
            }}
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                Explosive Fun Awaits!
              </h1>
              <h2 className="text-secondary-accent text-sm font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal max-w-2xl mx-auto text-gray-300">
                Join the ultimate game of strategy and wits. Create a room or join your friends now.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


