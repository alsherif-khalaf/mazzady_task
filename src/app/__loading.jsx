

function loading() {
    return (
        <div className="flex items-center justify-center text-center min-h-screen py-4  bg-transparent">
            <div>
                Loading
                <div className="flex items-center justify-center gap-2" >
                    <span className="
          block animate-pulse w-5 h-5 my-2 bg-blue-600/80 rounded-full
        "
                        style={
                            {
                                animationDelay: '0.5s',
                                animationDuration: '2s'
                            }
                        }>

                    </span>

                    <span className="
          block animate-pulse w-5 h-5 my-2 bg-blue-600/80 rounded-full
        "
                        style={
                            {
                                animationDelay: '0.6s',
                                animationDuration: '2s'
                            }
                        }>

                    </span>

                    <span className="
          block animate-pulse w-5 h-5 my-2 bg-blue-600/80 rounded-full
        "
                        style={
                            {
                                animationDelay: '0.7s',
                                animationDuration: '2s'
                            }
                        }>

                    </span>
                </div>

            </div>
        </div>
    )
}

export default loading
